export interface PurchaseOrder {
  id: string;
  date: string;
  itemId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  projectId: string;
}

export interface PriceHistory {
  itemId: string;
  date: string;
  unitPrice: number;
}

export interface ProjectCost {
  projectId: string;
  projectName: string;
  totalCost: number;
  category: string;
}

export interface Item {
  id: string;
  name: string;
  category: string;
  currentPrice: number;
  lastYearPrice: number;
  substitutes: string[];
}

export const mockItems: Item[] = [
  { id: 'I001', name: '고강도 철근 (SD400)', category: '자재', currentPrice: 950, lastYearPrice: 820, substitutes: ['SD300', '재생 철근'] },
  { id: 'I002', name: '레미콘 (25-24-150)', category: '자재', currentPrice: 88000, lastYearPrice: 81000, substitutes: ['현장 배합 콘크리트'] },
  { id: 'I003', name: '알루미늄 거푸집', category: '설비', currentPrice: 45000, lastYearPrice: 42000, substitutes: ['유로폼', '플라스틱 거푸집'] },
  { id: 'I004', name: '단열재 (비드법 2종)', category: '자재', currentPrice: 12000, lastYearPrice: 13500, substitutes: ['압출법 단열재', '미네랄울'] },
  { id: 'I005', name: 'LED 조명기구 (60W)', category: '전기', currentPrice: 25000, lastYearPrice: 28000, substitutes: ['중소기업 범용 LED'] },
];

export const mockPurchaseOrders: PurchaseOrder[] = [
  { id: 'PO-2024-001', date: '2024-01-15', itemId: 'I001', itemName: '고강도 철근 (SD400)', quantity: 100, unitPrice: 920, totalAmount: 92000, projectId: 'P-SEOUL-01' },
  { id: 'PO-2024-002', date: '2024-02-10', itemId: 'I002', itemName: '레미콘 (25-24-150)', quantity: 50, unitPrice: 85000, totalAmount: 4250000, projectId: 'P-SEOUL-01' },
  { id: 'PO-2024-003', date: '2024-03-05', itemId: 'I001', itemName: '고강도 철근 (SD400)', quantity: 150, unitPrice: 950, totalAmount: 142500, projectId: 'P-BUSAN-02' },
  { id: 'PO-2024-004', date: '2024-03-20', itemId: 'I003', itemName: '알루미늄 거푸집', quantity: 200, unitPrice: 45000, totalAmount: 9000000, projectId: 'P-SEOUL-01' },
  { id: 'PO-2024-005', date: '2024-04-01', itemId: 'I004', itemName: '단열재 (비드법 2종)', quantity: 300, unitPrice: 12000, totalAmount: 3600000, projectId: 'P-BUSAN-02' },
];

export const mockPriceHistory: PriceHistory[] = [
  { itemId: 'I001', date: '2023-01', unitPrice: 820 },
  { itemId: 'I001', date: '2023-06', unitPrice: 850 },
  { itemId: 'I001', date: '2024-01', unitPrice: 920 },
  { itemId: 'I001', date: '2024-03', unitPrice: 950 },
  { itemId: 'I002', date: '2023-01', unitPrice: 81000 },
  { itemId: 'I002', date: '2023-07', unitPrice: 83000 },
  { itemId: 'I002', date: '2024-02', unitPrice: 85000 },
  { itemId: 'I002', date: '2024-04', unitPrice: 88000 },
];

export const mockProjectCosts: ProjectCost[] = [
  { projectId: 'P-SEOUL-01', projectName: '서울 아파트 신축공사', totalCost: 500000000, category: '주거' },
  { projectId: 'P-BUSAN-02', projectName: '부산 오피스텔 신축공사', totalCost: 350000000, category: '상업' },
  { projectId: 'P-INCHEON-03', projectName: '인천 물류센터 공사', totalCost: 800000000, category: '산업' },
];
