import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BarChart, LineChart, PieChart } from '@/components/ui/chart';
import { Plus, ArrowUpRight, Users, ClipboardList, BarChart3 } from 'lucide-react';

export default function Dashboard() {
  // Mock data for charts
  const surveyData = [
    { name: '1月', value: 12 },
    { name: '2月', value: 19 },
    { name: '3月', value: 15 },
    { name: '4月', value: 27 },
    { name: '5月', value: 25 },
    { name: '6月', value: 32 },
  ];

  const responseData = [
    { name: '1月', value: 45 },
    { name: '2月', value: 78 },
    { name: '3月', value: 56 },
    { name: '4月', value: 120 },
    { name: '5月', value: 98 },
    { name: '6月', value: 145 },
  ];

  const completionRateData = [
    { name: '完了', value: 72 },
    { name: '中断', value: 28 },
  ];

  const recentSurveys = [
    { id: 1, title: '顧客満足度調査', responses: 145, created: '2025-06-01' },
    { id: 2, title: '製品フィードバック', responses: 87, created: '2025-05-28' },
    { id: 3, title: '従業員エンゲージメント', responses: 56, created: '2025-05-25' },
    { id: 4, title: '市場調査', responses: 32, created: '2025-05-20' },
  ];

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">ダッシュボード</h1>
            <p className="text-muted-foreground">
              アンケート活動と分析の概要
            </p>
          </div>
          <Link href="/dashboard/surveys/create">
            <Button className="mt-4 md:mt-0">
              <Plus className="mr-2 h-4 w-4" />
              アンケート作成
            </Button>
          </Link>
        </div>

        {/* Stats overview */}
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">アンケート総数</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-500 inline-flex items-center">
                  +12% <ArrowUpRight className="h-3 w-3 ml-1" />
                </span>{" "}
                先月比
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">回答総数</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">542</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-500 inline-flex items-center">
                  +18% <ArrowUpRight className="h-3 w-3 ml-1" />
                </span>{" "}
                先月比
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">アクティブユーザー</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-500 inline-flex items-center">
                  +5% <ArrowUpRight className="h-3 w-3 ml-1" />
                </span>{" "}
                先月比
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <Card className="col-span-1 lg:col-span-1">
            <CardHeader>
              <CardTitle>アンケート完了率</CardTitle>
              <CardDescription>
                完了したアンケートと中断したアンケートの割合
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart 
                data={completionRateData} 
                colors={['hsl(var(--chart-1))', 'hsl(var(--chart-3))']}
                height={220}
              />
            </CardContent>
          </Card>
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>作成されたアンケート</CardTitle>
              <CardDescription>
                時間経過に伴うアンケート作成数
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={surveyData} 
                color="hsl(var(--chart-2))"
                height={220}
              />
            </CardContent>
          </Card>
          <Card className="col-span-1 md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>回答傾向</CardTitle>
              <CardDescription>
                時間経過に伴う回答収集数
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart 
                data={responseData} 
                color="hsl(var(--chart-1))"
                height={220}
              />
            </CardContent>
          </Card>
        </div>

        {/* Recent surveys */}
        <Card>
          <CardHeader>
            <CardTitle>最近のアンケート</CardTitle>
            <CardDescription>
              最近作成されたアンケート
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">タイトル</th>
                    <th className="text-left py-3 px-4 font-medium">回答数</th>
                    <th className="text-left py-3 px-4 font-medium">作成日</th>
                    <th className="text-right py-3 px-4 font-medium">アクション</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSurveys.map((survey) => (
                    <tr key={survey.id} className="border-b">
                      <td className="py-3 px-4">{survey.title}</td>
                      <td className="py-3 px-4">{survey.responses}</td>
                      <td className="py-3 px-4">{survey.created}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/surveys/${survey.id}`}>
                            <Button variant="ghost" size="sm">表示</Button>
                          </Link>
                          <Link href={`/dashboard/surveys/${survey.id}/edit`}>
                            <Button variant="ghost" size="sm">編集</Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <Link href="/dashboard/surveys">
                <Button variant="outline">すべてのアンケートを表示</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}