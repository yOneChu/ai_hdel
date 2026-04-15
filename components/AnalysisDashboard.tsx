'use client';

import { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { 
  TrendingUp, 
  ArrowRightLeft, 
  Target, 
  AlertCircle, 
  Loader2, 
  BarChart3,
  Package,
  History,
  Lightbulb
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { 
  mockItems, 
  mockPurchaseOrders, 
  mockPriceHistory, 
  mockProjectCosts,
  Item
} from '@/lib/mock-data';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });

interface AnalysisResult {
  risingItems: { name: string; reason: string; trend: string }[];
  substitutes: { original: string; substitute: string; benefit: string }[];
  costReduction: { item: string; strategy: string; expectedSaving: string }[];
  summary: string;
}

export default function AnalysisDashboard() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(mockItems[0]);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const prompt = `
        다음 구매 발주 데이터, 단가 이력, 유사 프로젝트 원가 데이터를 분석하여 요약해줘:
        
        1. 구매 발주 데이터: ${JSON.stringify(mockPurchaseOrders)}
        2. 단가 이력: ${JSON.stringify(mockPriceHistory)}
        3. 아이템 정보: ${JSON.stringify(mockItems)}
        4. 유사 프로젝트 원가: ${JSON.stringify(mockProjectCosts)}
        
        분석 결과는 반드시 다음 JSON 형식으로 응답해줘:
        {
          "risingItems": [{"name": "품목명", "reason": "상승 이유", "trend": "상승 추세 설명"}],
          "substitutes": [{"original": "기존 품목", "substitute": "대체 품목", "benefit": "대체 시 이점"}],
          "costReduction": [{"item": "품목명", "strategy": "절감 전략", "expectedSaving": "예상 절감액/비율"}],
          "summary": "전체적인 분석 요약"
        }
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              risingItems: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    reason: { type: Type.STRING },
                    trend: { type: Type.STRING }
                  }
                }
              },
              substitutes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    original: { type: Type.STRING },
                    substitute: { type: Type.STRING },
                    benefit: { type: Type.STRING }
                  }
                }
              },
              costReduction: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    item: { type: Type.STRING },
                    strategy: { type: Type.STRING },
                    expectedSaving: { type: Type.STRING }
                  }
                }
              },
              summary: { type: Type.STRING }
            }
          }
        }
      });

      if (response.text) {
        setAnalysis(JSON.parse(response.text));
      }
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runAnalysis();
  }, []);

  const historyData = mockPriceHistory.filter(h => h.itemId === selectedItem?.id);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] p-4 md:p-8 font-sans">
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">구매 인사이트 대시보드</h1>
          <p className="text-[#64748B] mt-1">AI 기반 단가 분석 및 원가 절감 솔루션</p>
        </div>
        <button 
          onClick={runAnalysis}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-sm disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
          분석 업데이트
        </button>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: AI Insights */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Summary Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4 text-[#2563EB]">
              <Lightbulb className="w-5 h-5" />
              <h2 className="font-semibold text-lg">AI 분석 요약</h2>
            </div>
            {loading ? (
              <div className="h-20 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-[#94A3B8]" />
              </div>
            ) : (
              <p className="text-[#475569] leading-relaxed">
                {analysis?.summary || "데이터를 분석 중입니다..."}
              </p>
            )}
          </motion.div>

          {/* Analysis Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rising Items */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4 text-[#EF4444]">
                <TrendingUp className="w-5 h-5" />
                <h3 className="font-semibold">단가 상승 품목</h3>
              </div>
              <div className="space-y-4">
                {analysis?.risingItems.map((item, i) => (
                  <div key={i} className="border-l-2 border-[#FEE2E2] pl-3">
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs text-[#64748B] mt-1">{item.reason}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Substitutes */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4 text-[#10B981]">
                <ArrowRightLeft className="w-5 h-5" />
                <h3 className="font-semibold">대체 가능 품목</h3>
              </div>
              <div className="space-y-4">
                {analysis?.substitutes.map((item, i) => (
                  <div key={i} className="border-l-2 border-[#D1FAE5] pl-3">
                    <div className="font-medium text-sm">{item.original} → {item.substitute}</div>
                    <div className="text-xs text-[#64748B] mt-1">{item.benefit}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Cost Reduction */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4 text-[#F59E0B]">
                <Target className="w-5 h-5" />
                <h3 className="font-semibold">원가절감 후보</h3>
              </div>
              <div className="space-y-4">
                {analysis?.costReduction.map((item, i) => (
                  <div key={i} className="border-l-2 border-[#FEF3C7] pl-3">
                    <div className="font-medium text-sm">{item.item}</div>
                    <div className="text-xs text-[#64748B] mt-1">{item.strategy}</div>
                    <div className="text-xs font-semibold text-[#D97706] mt-1">{item.expectedSaving}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Price Trend Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-[#0F172A]">
                <History className="w-5 h-5" />
                <h2 className="font-semibold text-lg">단가 변동 추이</h2>
              </div>
              <select 
                className="bg-[#F1F5F9] border-none rounded-md text-sm px-3 py-1.5 focus:ring-2 focus:ring-[#2563EB]"
                value={selectedItem?.id}
                onChange={(e) => setSelectedItem(mockItems.find(i => i.id === e.target.value) || null)}
              >
                {mockItems.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748B', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748B', fontSize: 12 }}
                    dx={-10}
                    tickFormatter={(val) => val.toLocaleString()}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    formatter={(val: any) => [Number(val).toLocaleString() + '원', '단가']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="unitPrice" 
                    stroke="#2563EB" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#2563EB', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Data Tables & Stats */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Project Cost Distribution */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6 text-[#0F172A]">
              <BarChart3 className="w-5 h-5" />
              <h2 className="font-semibold text-lg">프로젝트별 원가</h2>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockProjectCosts} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="projectName" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748B', fontSize: 10 }}
                    width={100}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    formatter={(val: any) => [Number(val).toLocaleString() + '원', '총 원가']}
                  />
                  <Bar dataKey="totalCost" radius={[0, 4, 4, 0]}>
                    {mockProjectCosts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#2563EB', '#10B981', '#F59E0B'][index % 3]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Purchase Orders */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4 text-[#0F172A]">
              <Package className="w-5 h-5" />
              <h2 className="font-semibold text-lg">최근 발주 내역</h2>
            </div>
            <div className="space-y-4">
              {mockPurchaseOrders.map((po) => (
                <div key={po.id} className="group cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium group-hover:text-[#2563EB] transition-colors">{po.itemName}</div>
                      <div className="text-xs text-[#64748B]">{po.date} · {po.quantity}개</div>
                    </div>
                    <div className="text-sm font-semibold">
                      ₩{(po.totalAmount).toLocaleString()}
                    </div>
                  </div>
                  <div className="mt-2 h-1 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#2563EB] opacity-20" 
                      style={{ width: `${(po.unitPrice / 100000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Alert Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#FFF7ED] p-5 rounded-2xl border border-[#FFEDD5]"
          >
            <div className="flex items-center gap-2 text-[#9A3412] mb-2">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-semibold">주의 품목</h3>
            </div>
            <p className="text-sm text-[#C2410C]">
              철근 및 레미콘 단가가 전년 대비 10% 이상 상승했습니다. 대체 자재 검토가 시급합니다.
            </p>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
