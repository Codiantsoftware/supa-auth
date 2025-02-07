import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req) {
    try {
        const { url, key } = await req.json();

        if (!url || !key) {
            return NextResponse.json({ success: false, message: 'Missing credentials' }, { status: 400 });
        }

        const supabase = createClient(url, key);
        const { data: rlsData, error: rlsError } = await supabase.rpc('get_tables_rls_status');

        if (rlsError) {
            console.error(rlsError);
            return NextResponse.json({ success: false, message: 'Failed to fetch RLS status' }, { status: 500 });
        }

        const { data: users, error: userError } = await supabase.auth.admin.listUsers();
        if (userError) {
            console.error('Error:', userError);
            return NextResponse.json({ success: false, message: 'Failed to fetch users' }, { status: 500 });
        }
        const results = users?.users.map((user) => ({
            userId: user.id,
            email: user.email,
            mfaEnabled: user?.user_metadata?.mfa_enabled || false,
            status: user?.user_metadata?.mfa_enabled ? 'PASS' : 'FAIL',
        }));
        const SUPABASE_ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
        const response = await fetch('https://api.supabase.io/v1/projects', {
            headers: { Authorization: `Bearer ${SUPABASE_ACCESS_TOKEN}` },
        });

        if (!response.ok) {
            return NextResponse.json({ success: false, message: `Failed to fetch projects. Status: ${response.status}` }, { status: 500 });
        }

        const projects = await response.json();
        const projectData = projects?.map((proj) => ({
            projectId: proj.id,
            projectName: proj.name,
            pitrEnabled: proj?.pitr_enabled,
            status: proj.pitr_enabled ? 'PASS' : 'FAIL',
        }));

        const recommendations = rlsData?.map((t) => ({
            table: t.name,
            recommendation: t.has_rls
                ? `Great job! RLS is enabled for table '${t.name}', ensuring proper access control.`
                : `Enable Row Level Security (RLS) for table '${t.name}' to ensure proper access control.`,
            severity: t.has_rls ? "Low" : "High",
            details: t.has_rls
                ? "RLS is correctly implemented to prevent unauthorized access."
                : "RLS helps prevent unauthorized access to table rows based on the user making the request.",
        }));

        return NextResponse.json({
            success: true,
            message: "Security audit completed successfully",
            recommendations,
            totalUsers: users?.users?.length || 0,
            totalTables: rlsData?.length || 0,
            tablesWithRls: rlsData?.filter((t) => t.has_rls)?.length || 0,
            usersWithMfa: results?.filter((u) => u.mfaEnabled)?.length || 0,
            rlsAcceptanceRatio: rlsData?.length
                ? (rlsData.filter((t) => t.has_rls).length / rlsData.length) * 100
                : 1,
            rlsData,
            results,
            projectData,
            securityChecks: true
        }, { status: 200 });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            success: false,
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
