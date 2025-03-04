"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/dashboard-layout';
import { BarChart, LineChart, PieChart } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, LineChart as LineChartIcon, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AnalyticsPage() {
  // Mock data for charts
  const responsesByMonth = [
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

  const deviceData = [
    { name: 'デスクトップ', value: 58 },
    { name: 'モバイル', value: 35 },
    { name: 'タブレット', value: 7 },
  ];

  const responseTimeData = [
    { name: '1分未満', value: 15 },
    { name: '1-2分', value: 25 },
    { name: '2-5分', value: 40 },
    { name: '5-10分', value: 15 },
    { name: '10分以上', value: 5 },
  ];

  const questionCompletionData = [
    { name: 'Q1', value: 98 },
    { name: 'Q2', value: 95 },
    { name: 'Q3', value: 92 },
    { name: 'Q4', value: 88 },
    { name: 'Q5', value: 85 },
    { name: 'Q6', value: 80 },
    { name: 'Q7', value: 75 },
    { name: 'Q8', value: 70 },
  ];

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">分析</h1>
            <p className="text-muted-foreground">
              アンケートに関する洞察と統計
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="期間を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべての期間</SelectItem>
                <SelectItem value="year">過去1年</SelectItem>
                <SelectItem value="6months">過去6ヶ月</SelectItem>
                <SelectItem value="month">過去1ヶ月</SelectItem>
                <SelectItem value="week">過去1週間</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              エクスポート
            </Button>
          </div>
        </div>

        {/* Overview stats */}
        <div className="grid gap-6 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">回答総数</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">542</div>
              <p className="text-xs text-muted-foreground mt-1">
                前期比 +18%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">完了率</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72%</div>
              <p className="text-xs text-muted-foreground mt-1">
                前期比 +5%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">平均回答時間</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.5分</div>
              <p className="text-xs text-muted-foreground mt-1">
                前期比 -0.5分
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">アクティブなアンケート</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground mt-1">
                前期比 +3
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main charts */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>回答傾向</CardTitle>
              <CardDescription>
                時間経過に伴う回答収集数
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="line">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="line">
                      <LineChartIcon className="h-4 w-4 mr-2" />
                      折れ線
                    </TabsTrigger>
                    <TabsTrigger value="bar">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      棒グラフ
                    </TabsTrigger>
                  </TabsList>
                  <Select defaultValue="monthly">
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="表示単位" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">日次</SelectItem>
                      <SelectItem value="weekly">週次</SelectItem>
                      <SelectItem value="monthly">月次</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <TabsContent value="line">
                  <LineChart 
                    data={responsesByMonth} 
                    color="hsl(var(--chart-1))"
                    height={300}
                  />
                </TabsContent>
                <TabsContent value="bar">
                  <BarChart 
                    data={responsesByMonth} 
                    color="hsl(var(--chart-1))"
                    height={300}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>完了率</CardTitle>
              <CardDescription>
                完了したアンケートと中断したアンケートの割合
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart 
                data={completionRateData} 
                colors={['hsl(var(--chart-1))', 'hsl(var(--chart-3))']}
                height={250}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>デバイス分布</CardTitle>
              <CardDescription>
                デバイスタイプ別の回答数
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart 
                data={deviceData} 
                colors={['hsl(var(--chart-2))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))']}
                height={250}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>回答時間</CardTitle>
              <CardDescription>
                アンケート完了までにかかった時間
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={responseTimeData} 
                color="hsl(var(--chart-3))"
                height={250}
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>質問完了率</CardTitle>
            <CardDescription>
              各質問に回答した回答者の割合
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={questionCompletionData} 
              color="hsl(var(--chart-2))"
              height={300}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}