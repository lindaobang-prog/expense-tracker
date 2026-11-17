"use strict";

const STORAGE_KEY = "daily-ledger-transactions-v1";
const LANGUAGE_KEY = "daily-ledger-language-v1";
const RATE_KEY = "daily-ledger-hkd-cny-rate-v1";
const DISPLAY_CURRENCY_KEY = "daily-ledger-display-currency-v1";
const ACCOUNTS_KEY = "daily-ledger-accounts-v2";
const GOALS_KEY = "daily-ledger-goals-v2";
const TRANSFERS_KEY = "daily-ledger-goal-transfers-v2";
const BUDGET_KEY = "daily-ledger-budget-v2";
const TEMPLATES_KEY = "daily-ledger-templates-v2";
const LEGACY_ASSETS_KEY = "daily-ledger-assets-v1";
const LEGACY_GOAL_KEY = "daily-ledger-savings-goal-v1";
const LEGACY_BUDGET_KEY = "daily-ledger-daily-budget-v1";
const DEFAULT_RATE = 0.84;
const DEFAULT_ACCOUNT_IDS = { HKD: "daily-hkd", CNY: "daily-cny" };
const CATEGORY_IDS = ["food", "transport", "learning", "shopping", "leisure", "other"];
const CATEGORY_COLORS = ["#6e9a80", "#d4a875", "#8d91b5", "#c77f70", "#a9a05f", "#849ba0"];
const CURRENCIES = ["HKD", "CNY"];
const LANGUAGES = ["zh-Hant", "zh-Hans", "en"];
const LEGACY_CATEGORIES = {
  "餐飲飲食": "food",
  "餐饮饮食": "food",
  "飲食": "food",
  "饮食": "food",
  "交通出行": "transport",
  "學習書籍": "learning",
  "学习书籍": "learning",
  "日常購物": "shopping",
  "日常购物": "shopping",
  "娛樂休閒": "leisure",
  "娱乐休闲": "leisure",
  "其他": "other",
};

const MESSAGES = {
  "zh-Hant": {
    metaDescription: "快速記帳，掌握每日額度與個人資產。",
    appName: "日常記帳",
    homeLabel: "日常記帳首頁",
    exchangeRate: "匯率",
    rateLabel: "人民幣兌港幣匯率",
    languageLabel: "選擇語言",
    advancedTools: "進階工具",
    financeCenter: "理財中心",
    reportsSettings: "報表與設定",
    statusLabel: "今日額度與總資產",
    availableToday: "今日剩餘可用額度",
    netWorth: "總資產淨值",
    toggleCurrencyLabel: "切換幣種顯示",
    noBudget: "尚未設定額度",
    setBudgetHint: "前往理財中心設定",
    budgetLeft: "今日尚餘 {amount}",
    budgetSpent: "已花費 {spent} / 額度 {limit}",
    budgetOver: "今日超支 {amount}",
    budgetWarning: "今日額度已超支 {amount}，記得留意支出。",
    budgetUnlimited: "未設定每日額度",
    quickEyebrow: "快速記帳",
    quickTitle: "記下一筆",
    amount: "金額",
    currencyLabel: "記帳幣種",
    typeLabel: "收支類型",
    expense: "支出",
    income: "收入",
    categoryOptions: "選擇分類",
    categories: {
      food: "餐飲",
      transport: "交通",
      learning: "學習",
      shopping: "購物",
      leisure: "娛樂",
      other: "其他",
    },
    today: "今天",
    yesterday: "昨天",
    customDate: "自選",
    customDateLabel: "自選記帳日期",
    quickDateLabel: "記帳日期",
    note: "備註",
    notePlaceholder: "備註（選填）",
    addRecord: "記帳",
    added: "已記帳。",
    invalidEntry: "請輸入有效金額、幣種與日期。",
    recentEyebrow: "最近",
    recentTitle: "近期明細",
    noTransactions: "還沒有記錄。輸入金額，按 Enter 即可完成第一筆記帳。",
    noRecent: "目前沒有近期記錄。",
    deleteRecord: "刪除 {date} {category} 記錄",
    deleteTitle: "刪除記錄",
    recordsCount: "{count} 筆",
    workspaceEyebrow: "個人理財",
    closeDialog: "關閉",
    advancedTabs: "進階面板分頁",
    accountsEyebrow: "帳戶",
    accountsTitle: "帳戶與資產",
    accountsHint: "校準帳戶目前餘額；之後的記帳會自動增減。大額儲蓄帳戶不納入日常額度。",
    defaultHkd: "日常港幣",
    defaultCny: "日常人民幣",
    dailyAccount: "零花錢帳戶",
    savingsAccount: "大額儲蓄",
    includedInBudget: "計入每日額度",
    currentBalance: "目前餘額",
    saveBalance: "校準餘額",
    accountNamePlaceholder: "帳戶名稱",
    currentBalancePlaceholder: "目前餘額",
    accountKindLabel: "帳戶類型",
    addAccount: "新增帳戶",
    accountSaved: "帳戶已更新。",
    accountAdded: "帳戶已新增。",
    invalidAccount: "請提供帳戶名稱及有效的非負餘額。",
    noAccounts: "尚無帳戶。",
    chooseAccount: "選擇帳戶",
    budgetEyebrow: "每日預算",
    budgetSettingsTitle: "每日額度與預警",
    smartBudget: "智能剩餘額度計算",
    smartBudgetHint: "以本月預算扣除本月已用額度，再按剩餘天數平均分配今日可用額度。",
    dailyLimit: "固定每日上限",
    monthlyLimit: "本月總預算",
    budgetCurrency: "額度幣種",
    saveBudget: "儲存額度",
    budgetSaved: "預算設定已儲存。",
    budgetRequiresLimit: "請設定大於 0 的每日上限或本月總預算。",
    goalsEyebrow: "儲蓄目標",
    goalsTitle: "心願存錢罐",
    goalNamePlaceholder: "目標名稱，例如：旅行基金",
    noGoals: "建立一個目標，開始累積存款。",
    goalAmountPlaceholder: "目標金額",
    addGoal: "建立目標",
    goalAdded: "儲蓄目標已建立。",
    goalLimit: "最多可建立 2 個目標。",
    goalTarget: "目標",
    goalSaved: "已存",
    goalComplete: "目標達成",
    goalRemaining: "距離目標尚差 {amount}",
    goalTransfer: "劃轉存款",
    transferAmount: "劃轉金額",
    transferFrom: "從帳戶轉入",
    transferred: "已成功轉入 {amount}。",
    transferTooMuch: "帳戶餘額不足，無法完成劃轉。",
    invalidTransfer: "請輸入大於 0 的有效劃轉金額。",
    noTransferAccounts: "請先建立同幣種的零花錢帳戶。",
    templatesEyebrow: "固定支出",
    templatesTitle: "週期性支出模板",
    templates: "快速模板",
    templateNamePlaceholder: "名稱，例如：每月房租",
    amountPlaceholder: "金額",
    addTemplate: "新增模板",
    templateAdded: "固定支出模板已新增。",
    useTemplate: "一鍵記帳",
    removeTemplate: "刪除模板",
    noTemplates: "新增常用支出，之後可一鍵記帳。",
    reportsEyebrow: "數據洞察",
    reportsTitle: "報表與設定",
    reportPeriods: "報表時間範圍",
    thisWeek: "本週",
    thisMonth: "本月",
    customDate: "自選",
    reportStart: "報表開始日期",
    reportEnd: "報表結束日期",
    searchNotes: "搜尋備註關鍵字",
    categoryReport: "支出分類",
    trendReport: "近 7 日消費趨勢",
    categoryChartLabel: "支出分類圓餅圖",
    trendChartLabel: "近七日消費趨勢折線圖",
    noReportExpenses: "這段期間尚無支出。",
    noTrendExpenses: "近 7 日尚無支出。",
    reportCount: "符合條件 {count} 筆",
    backupTitle: "資料備份與還原",
    backupHint: "JSON 備份包含帳戶、目標、預算、模板、匯率與全部帳單。",
    exportJson: "匯出完整備份",
    importJson: "匯入 JSON 備份",
    exportCsv: "匯出 CSV",
    confirmImport: "匯入備份會取代目前所有記帳與設定。建議先匯出備份。確定要繼續嗎？",
    importSuccess: "備份已匯入並還原。",
    importError: "無法匯入備份：{error}",
    invalidBackup: "備份檔格式無效或資料不完整。",
    confirmClear: "確定清空所有帳單記錄？資產與理財設定會保留。",
    clearData: "清空帳單",
    cleared: "帳單已清空。",
    csvExported: "CSV 已匯出。",
    jsonExported: "完整 JSON 備份已匯出。",
    invalidRate: "請輸入大於 0 的有效匯率。",
    storageReadError: "無法讀取儲存資料：{error}",
    storageSaveError: "儲存失敗，請檢查瀏覽器儲存空間：{error}",
    storageAccessError: "無法存取瀏覽器儲存空間：{error}",
    chartLoadError: "圖表載入失敗，請確認網絡連線後重新整理。",
    footer: "把每一筆記好，讓理財更簡單。",
    csvDate: "日期",
    csvType: "類型",
    csvCategory: "分類",
    csvCurrency: "幣種",
    csvAmount: "原始金額",
    csvAccount: "帳戶",
    csvNote: "備註",
  },
  "zh-Hans": {
    metaDescription: "快速记账，掌握每日额度与个人资产。",
    appName: "日常记账",
    homeLabel: "日常记账首页",
    exchangeRate: "汇率",
    rateLabel: "人民币兑港币汇率",
    languageLabel: "选择语言",
    advancedTools: "进阶工具",
    financeCenter: "理财中心",
    reportsSettings: "报表与设置",
    statusLabel: "今日额度与总资产",
    availableToday: "今日剩余可用额度",
    netWorth: "总资产净值",
    toggleCurrencyLabel: "切换币种显示",
    noBudget: "尚未设置额度",
    setBudgetHint: "前往理财中心设置",
    budgetLeft: "今日剩余 {amount}",
    budgetSpent: "已花费 {spent} / 额度 {limit}",
    budgetOver: "今日超支 {amount}",
    budgetWarning: "今日额度已超支 {amount}，记得留意支出。",
    budgetUnlimited: "未设置每日额度",
    quickEyebrow: "快速记账",
    quickTitle: "记下一笔",
    amount: "金额",
    currencyLabel: "记账币种",
    typeLabel: "收支类型",
    expense: "支出",
    income: "收入",
    categoryOptions: "选择分类",
    categories: {
      food: "餐饮",
      transport: "交通",
      learning: "学习",
      shopping: "购物",
      leisure: "娱乐",
      other: "其他",
    },
    today: "今天",
    yesterday: "昨天",
    customDate: "自选",
    customDateLabel: "自选记账日期",
    quickDateLabel: "记账日期",
    note: "备注",
    notePlaceholder: "备注（选填）",
    addRecord: "记账",
    added: "已记账。",
    invalidEntry: "请输入有效金额、币种和日期。",
    recentEyebrow: "最近",
    recentTitle: "近期明细",
    noTransactions: "还没有记录。输入金额，按 Enter 即可完成第一笔记账。",
    noRecent: "目前没有近期记录。",
    deleteRecord: "删除 {date} {category} 记录",
    deleteTitle: "删除记录",
    recordsCount: "{count} 笔",
    workspaceEyebrow: "个人理财",
    closeDialog: "关闭",
    advancedTabs: "进阶面板分页",
    accountsEyebrow: "账户",
    accountsTitle: "账户与资产",
    accountsHint: "校准账户当前余额；之后的记账会自动增减。大额储蓄账户不计入日常额度。",
    defaultHkd: "日常港币",
    defaultCny: "日常人民币",
    dailyAccount: "零花钱账户",
    savingsAccount: "大额储蓄",
    includedInBudget: "计入每日额度",
    currentBalance: "当前余额",
    saveBalance: "校准余额",
    accountNamePlaceholder: "账户名称",
    currentBalancePlaceholder: "当前余额",
    accountKindLabel: "账户类型",
    addAccount: "新增账户",
    accountSaved: "账户已更新。",
    accountAdded: "账户已新增。",
    invalidAccount: "请提供账户名称和有效的非负余额。",
    noAccounts: "暂无账户。",
    chooseAccount: "选择账户",
    budgetEyebrow: "每日预算",
    budgetSettingsTitle: "每日额度与预警",
    smartBudget: "智能剩余额度计算",
    smartBudgetHint: "用本月预算减去已用额度，再按剩余天数平均分配今日可用额度。",
    dailyLimit: "固定每日上限",
    monthlyLimit: "本月总预算",
    budgetCurrency: "额度币种",
    saveBudget: "保存额度",
    budgetSaved: "预算设置已保存。",
    budgetRequiresLimit: "请设置大于 0 的每日上限或本月总预算。",
    goalsEyebrow: "储蓄目标",
    goalsTitle: "心愿存钱罐",
    goalNamePlaceholder: "目标名称，例如：旅行基金",
    noGoals: "创建一个目标，开始积累存款。",
    goalAmountPlaceholder: "目标金额",
    addGoal: "创建目标",
    goalAdded: "储蓄目标已创建。",
    goalLimit: "最多可创建 2 个目标。",
    goalTarget: "目标",
    goalSaved: "已存",
    goalComplete: "目标达成",
    goalRemaining: "距离目标还差 {amount}",
    goalTransfer: "转入存款",
    transferAmount: "转入金额",
    transferFrom: "从账户转入",
    transferred: "已成功转入 {amount}。",
    transferTooMuch: "账户余额不足，无法完成转入。",
    invalidTransfer: "请输入大于 0 的有效转入金额。",
    noTransferAccounts: "请先建立同币种的零花钱账户。",
    templatesEyebrow: "固定支出",
    templatesTitle: "周期性支出模板",
    templates: "快捷模板",
    templateNamePlaceholder: "名称，例如：每月房租",
    amountPlaceholder: "金额",
    addTemplate: "新增模板",
    templateAdded: "固定支出模板已新增。",
    useTemplate: "一键记账",
    removeTemplate: "删除模板",
    noTemplates: "添加常用支出，以后一键记账。",
    reportsEyebrow: "数据洞察",
    reportsTitle: "报表与设置",
    reportPeriods: "报表时间范围",
    thisWeek: "本周",
    thisMonth: "本月",
    reportStart: "报表开始日期",
    reportEnd: "报表结束日期",
    searchNotes: "搜索备注关键词",
    categoryReport: "支出分类",
    trendReport: "近 7 日消费趋势",
    categoryChartLabel: "支出分类饼图",
    trendChartLabel: "近七日消费趋势折线图",
    noReportExpenses: "这段期间暂无支出。",
    noTrendExpenses: "近 7 日暂无支出。",
    reportCount: "符合条件 {count} 笔",
    backupTitle: "数据备份与还原",
    backupHint: "JSON 备份包含账户、目标、预算、模板、汇率和全部账单。",
    exportJson: "导出完整备份",
    importJson: "导入 JSON 备份",
    exportCsv: "导出 CSV",
    confirmImport: "导入备份会替换当前所有记账和设置。建议先导出备份。确定继续吗？",
    importSuccess: "备份已导入并还原。",
    importError: "无法导入备份：{error}",
    invalidBackup: "备份文件格式无效或数据不完整。",
    confirmClear: "确定清空所有账单记录？资产和理财设置会保留。",
    clearData: "清空账单",
    cleared: "账单已清空。",
    csvExported: "CSV 已导出。",
    jsonExported: "完整 JSON 备份已导出。",
    invalidRate: "请输入大于 0 的有效汇率。",
    storageReadError: "无法读取已保存的数据：{error}",
    storageSaveError: "保存失败，请检查浏览器存储空间：{error}",
    storageAccessError: "无法访问浏览器存储空间：{error}",
    chartLoadError: "图表加载失败，请检查网络连接后刷新页面。",
    footer: "记好每一笔，让理财更简单。",
    csvDate: "日期",
    csvType: "类型",
    csvCategory: "分类",
    csvCurrency: "币种",
    csvAmount: "原始金额",
    csvAccount: "账户",
    csvNote: "备注",
  },
  en: {
    metaDescription: "Quickly track spending, daily budgets, and personal assets.",
    appName: "Daily Ledger",
    homeLabel: "Daily Ledger home",
    exchangeRate: "Rate",
    rateLabel: "CNY per HKD exchange rate",
    languageLabel: "Choose language",
    advancedTools: "Advanced tools",
    financeCenter: "Finance center",
    reportsSettings: "Reports & settings",
    statusLabel: "Today's allowance and net worth",
    availableToday: "Available to spend today",
    netWorth: "Total net worth",
    toggleCurrencyLabel: "Switch display currency",
    noBudget: "No budget set",
    setBudgetHint: "Set up in Finance Center",
    budgetLeft: "{amount} left today",
    budgetSpent: "Spent {spent} / limit {limit}",
    budgetOver: "{amount} over budget today",
    budgetWarning: "Daily budget exceeded by {amount}. Keep an eye on spending.",
    budgetUnlimited: "No daily budget set",
    quickEyebrow: "QUICK ENTRY",
    quickTitle: "Add a transaction",
    amount: "Amount",
    currencyLabel: "Transaction currency",
    typeLabel: "Transaction type",
    expense: "Expense",
    income: "Income",
    categoryOptions: "Choose a category",
    categories: {
      food: "Dining",
      transport: "Transport",
      learning: "Learning",
      shopping: "Shopping",
      leisure: "Leisure",
      other: "Other",
    },
    today: "Today",
    yesterday: "Yesterday",
    customDate: "Custom",
    customDateLabel: "Choose transaction date",
    quickDateLabel: "Transaction date",
    note: "Note",
    notePlaceholder: "Note (optional)",
    addRecord: "Add",
    added: "Transaction added.",
    invalidEntry: "Enter a valid amount, currency, and date.",
    recentEyebrow: "RECENT",
    recentTitle: "Recent activity",
    noTransactions: "No entries yet. Enter an amount and press Enter to add one.",
    noRecent: "No recent transactions.",
    deleteRecord: "Delete {date} {category} transaction",
    deleteTitle: "Delete transaction",
    recordsCount: "{count} entries",
    workspaceEyebrow: "PERSONAL FINANCE",
    closeDialog: "Close",
    advancedTabs: "Advanced panel tabs",
    accountsEyebrow: "ACCOUNTS",
    accountsTitle: "Accounts & assets",
    accountsHint: "Calibrate current balances. New transactions update them automatically. Savings accounts stay outside the daily budget.",
    defaultHkd: "Everyday HKD",
    defaultCny: "Everyday CNY",
    dailyAccount: "Spending",
    savingsAccount: "Long-term savings",
    includedInBudget: "Count in daily budget",
    currentBalance: "Current balance",
    saveBalance: "Calibrate",
    accountNamePlaceholder: "Account name",
    currentBalancePlaceholder: "Current balance",
    accountKindLabel: "Account type",
    addAccount: "Add account",
    accountSaved: "Account updated.",
    accountAdded: "Account added.",
    invalidAccount: "Enter an account name and a valid non-negative balance.",
    noAccounts: "No accounts yet.",
    chooseAccount: "Choose account",
    budgetEyebrow: "DAILY BUDGET",
    budgetSettingsTitle: "Daily allowance & alerts",
    smartBudget: "Calculate a smart daily allowance",
    smartBudgetHint: "Subtract this month's spending from the monthly budget, then divide by the days remaining.",
    dailyLimit: "Fixed daily limit",
    monthlyLimit: "Monthly budget",
    budgetCurrency: "Budget currency",
    saveBudget: "Save budget",
    budgetSaved: "Budget settings saved.",
    budgetRequiresLimit: "Set a daily limit or monthly budget greater than zero.",
    goalsEyebrow: "SAVINGS GOALS",
    goalsTitle: "Savings pots",
    goalNamePlaceholder: "Goal name, e.g. Travel fund",
    noGoals: "Create a goal to start saving toward it.",
    goalAmountPlaceholder: "Target amount",
    addGoal: "Create goal",
    goalAdded: "Savings goal created.",
    goalLimit: "You can create up to 2 goals.",
    goalTarget: "Target",
    goalSaved: "Saved",
    goalComplete: "Goal reached",
    goalRemaining: "{amount} left to reach your goal",
    goalTransfer: "Transfer savings",
    transferAmount: "Transfer amount",
    transferFrom: "Transfer from",
    transferred: "{amount} transferred successfully.",
    transferTooMuch: "The account balance is too low for this transfer.",
    invalidTransfer: "Enter a transfer amount greater than zero.",
    noTransferAccounts: "Add a spending account in the same currency first.",
    templatesEyebrow: "RECURRING",
    templatesTitle: "Recurring expense templates",
    templates: "Quick templates",
    templateNamePlaceholder: "Name, e.g. Monthly rent",
    amountPlaceholder: "Amount",
    addTemplate: "Add template",
    templateAdded: "Recurring template added.",
    useTemplate: "Add now",
    removeTemplate: "Delete template",
    noTemplates: "Save a common expense to add it in one tap next time.",
    reportsEyebrow: "INSIGHTS",
    reportsTitle: "Reports & settings",
    reportPeriods: "Report date range",
    thisWeek: "This week",
    thisMonth: "This month",
    reportStart: "Report start date",
    reportEnd: "Report end date",
    searchNotes: "Search notes",
    categoryReport: "Spending by category",
    trendReport: "Spending trend · last 7 days",
    categoryChartLabel: "Expense category pie chart",
    trendChartLabel: "Spending line chart for the last seven days",
    noReportExpenses: "No expenses in this period.",
    noTrendExpenses: "No spending in the last 7 days.",
    reportCount: "{count} matching entries",
    backupTitle: "Backup & restore",
    backupHint: "JSON includes accounts, goals, budgets, templates, exchange rate, and every transaction.",
    exportJson: "Export full backup",
    importJson: "Import JSON backup",
    exportCsv: "Export CSV",
    confirmImport: "Importing replaces all current transactions and settings. Export a backup first if needed. Continue?",
    importSuccess: "Backup restored successfully.",
    importError: "Could not import backup: {error}",
    invalidBackup: "The backup format is invalid or incomplete.",
    confirmClear: "Clear all transactions? Account and finance settings will be kept.",
    clearData: "Clear transactions",
    cleared: "Transactions cleared.",
    csvExported: "CSV exported.",
    jsonExported: "Full JSON backup exported.",
    invalidRate: "Enter a valid exchange rate greater than zero.",
    storageReadError: "Could not read saved data: {error}",
    storageSaveError: "Could not save data. Check your browser storage: {error}",
    storageAccessError: "Could not access browser storage: {error}",
    chartLoadError: "The charts could not load. Check your connection and refresh.",
    footer: "Make every entry count.",
    csvDate: "Date",
    csvType: "Type",
    csvCategory: "Category",
    csvCurrency: "Currency",
    csvAmount: "Original amount",
    csvAccount: "Account",
    csvNote: "Note",
  },
};

function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function shiftDate(date, offset) {
  const shifted = new Date(`${date}T00:00:00`);
  shifted.setDate(shifted.getDate() + offset);
  return localDateString(shifted);
}

function isValidDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00`);
  return !Number.isNaN(date.getTime()) && localDateString(date) === value;
}

const toast = document.querySelector("#toast");
const form = document.querySelector("#transaction-form");
const currencyInput = document.querySelector("#currency");
const amountInput = document.querySelector("#amount");
const categoryInput = document.querySelector("#category");
const dateInput = document.querySelector("#date");
const transactionList = document.querySelector("#recent-list");
const dialog = document.querySelector("#advanced-dialog");
const financeView = document.querySelector("#finance-view");
const reportsView = document.querySelector("#reports-view");
const budgetForm = document.querySelector("#budget-form");
const accountList = document.querySelector("#account-list");
const goalList = document.querySelector("#goal-list");
const recurringList = document.querySelector("#recurring-list");
const budgetStatus = document.querySelector("#status-banner");

let storageWarnings = [];
let language = readLanguage();
let exchangeRate = readExchangeRate();
let displayCurrency = readDisplayCurrency();
let transactions = loadTransactions();
let accounts = loadAccounts();
let goals = loadGoals();
let transfers = loadTransfers();
let budget = loadBudget();
let templates = loadTemplates();
let selectedDate = localDateString();
let reportPeriod = "week";
let categoryChart = null;
let trendChart = null;
let toastTimeout;
let chartWarningShown = false;

function t(key) {
  return MESSAGES[language][key];
}

function interpolate(template, values) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

function locale() {
  return language === "zh-Hant" ? "zh-HK" : language === "zh-Hans" ? "zh-CN" : "en";
}

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    storageWarnings.push(interpolate(MESSAGES["zh-Hant"].storageAccessError, { error: error.message }));
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    showToast(interpolate(t("storageSaveError"), { error: error.message }));
    return false;
  }
}

function readJson(key) {
  const raw = readStorage(key);
  if (raw === null) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    storageWarnings.push(interpolate(MESSAGES[language].storageReadError, { error: error.message }));
    return null;
  }
}

function writeJson(key, value) {
  return writeStorage(key, JSON.stringify(value));
}

function atomicWrite(entries) {
  const original = new Map();
  try {
    for (const [key, value] of entries) original.set(key, localStorage.getItem(key));
    for (const [key, value] of entries) localStorage.setItem(key, value);
    return true;
  } catch (error) {
    for (const [key, previous] of original) {
      try {
        if (previous === null) localStorage.removeItem(key);
        else localStorage.setItem(key, previous);
      } catch {
        showToast(interpolate(t("storageSaveError"), { error: "Could not restore previous settings." }));
        return false;
      }
    }
    showToast(interpolate(t("storageSaveError"), { error: error.message }));
    return false;
  }
}

function readLanguage() {
  const saved = readStorage(LANGUAGE_KEY);
  return LANGUAGES.includes(saved) ? saved : "zh-Hant";
}

function readExchangeRate() {
  const stored = readStorage(RATE_KEY);
  if (stored === null) return DEFAULT_RATE;
  const value = Number(stored);
  if (Number.isFinite(value) && value > 0) return value;
  storageWarnings.push(MESSAGES[language].invalidRate);
  return DEFAULT_RATE;
}

function readDisplayCurrency() {
  const stored = readStorage(DISPLAY_CURRENCY_KEY);
  return CURRENCIES.includes(stored) ? stored : "HKD";
}

function notifyReadError(error) {
  storageWarnings.push(interpolate(MESSAGES[language].storageReadError, { error }));
}

function normalizeTransaction(item, accountIds = null) {
  if (!item || typeof item !== "object") return null;
  const category = CATEGORY_IDS.includes(item.category)
    ? item.category
    : LEGACY_CATEGORIES[item.category];
  const currency = CURRENCIES.includes(item.currency) ? item.currency : "HKD";
  const accountId = typeof item.accountId === "string"
    ? item.accountId
    : DEFAULT_ACCOUNT_IDS[currency];
  if (
    typeof item.id !== "string" ||
    (item.type !== "income" && item.type !== "expense") ||
    !Number.isFinite(item.amount) ||
    item.amount <= 0 ||
    !category ||
    !isValidDate(item.date) ||
    (item.note !== undefined && typeof item.note !== "string") ||
    (accountIds && !accountIds.has(accountId))
  ) return null;
  return {
    id: item.id,
    type: item.type,
    amount: Math.round(item.amount * 100) / 100,
    currency,
    category,
    date: item.date,
    note: item.note || "",
    accountId,
  };
}

function loadTransactions() {
  const saved = readJson(STORAGE_KEY);
  if (saved === null) return [];
  if (!Array.isArray(saved)) {
    notifyReadError("Expected a list of transactions.");
    return [];
  }
  return saved.map((item) => normalizeTransaction(item)).filter(Boolean);
}

function loadAccounts() {
  const saved = readJson(ACCOUNTS_KEY);
  if (Array.isArray(saved)) {
    const valid = saved.filter((account) =>
      account &&
      typeof account.id === "string" &&
      typeof account.name === "string" &&
      CURRENCIES.includes(account.currency) &&
      (account.kind === "daily" || account.kind === "savings") &&
      Number.isFinite(account.baseBalance) &&
      typeof account.includeInBudget === "boolean"
    );
    for (const currency of CURRENCIES) {
      if (!valid.some((account) => account.id === DEFAULT_ACCOUNT_IDS[currency])) {
        valid.push({
          id: DEFAULT_ACCOUNT_IDS[currency],
          name: "",
          currency,
          kind: "daily",
          baseBalance: 0,
          includeInBudget: true,
        });
      }
    }
    if (valid.length >= 2) return valid;
  }

  const oldAssets = readJson(LEGACY_ASSETS_KEY);
  const result = CURRENCIES.map((currency) => ({
    id: DEFAULT_ACCOUNT_IDS[currency],
    name: "",
    currency,
    kind: "daily",
    baseBalance: 0,
    includeInBudget: true,
  }));
  if (
    oldAssets &&
    Number.isFinite(oldAssets.hkd) &&
    Number.isFinite(oldAssets.cny) &&
    isValidDate(oldAssets.asOfDate)
  ) {
    for (const account of result) {
      const oldOpening = account.currency === "HKD" ? oldAssets.hkd : oldAssets.cny;
      const fullNet = transactions
        .filter((item) => item.currency === account.currency)
        .reduce((sum, item) => sum + item.amount * (item.type === "income" ? 1 : -1), 0);
      const oldIncludedNet = transactions
        .filter((item) => item.currency === account.currency && item.date >= oldAssets.asOfDate)
        .reduce((sum, item) => sum + item.amount * (item.type === "income" ? 1 : -1), 0);
      account.baseBalance = oldOpening + oldIncludedNet - fullNet;
    }
  }
  return result;
}

function loadGoals() {
  const saved = readJson(GOALS_KEY);
  if (Array.isArray(saved)) {
    return saved.filter((goal) =>
      goal &&
      typeof goal.id === "string" &&
      typeof goal.name === "string" &&
      Number.isFinite(goal.target) &&
      goal.target > 0 &&
      Number.isFinite(goal.saved) &&
      goal.saved >= 0 &&
      CURRENCIES.includes(goal.currency)
    ).slice(0, 2);
  }
  const legacy = readJson(LEGACY_GOAL_KEY);
  if (legacy && typeof legacy.name === "string" && Number.isFinite(legacy.amount) && legacy.amount > 0 && CURRENCIES.includes(legacy.currency)) {
    return [{
      id: "migrated-goal",
      name: legacy.name,
      target: legacy.amount,
      currency: legacy.currency,
      saved: 0,
    }];
  }
  return [];
}

function loadTransfers() {
  const saved = readJson(TRANSFERS_KEY);
  if (!Array.isArray(saved)) return [];
  const accountIds = new Set(accounts.map((account) => account.id));
  const goalIds = new Set(goals.map((goal) => goal.id));
  return saved.filter((item) =>
    item &&
    typeof item.id === "string" &&
    accountIds.has(item.sourceAccountId) &&
    goalIds.has(item.goalId) &&
    Number.isFinite(item.sourceAmount) &&
    item.sourceAmount > 0 &&
    Number.isFinite(item.goalAmount) &&
    item.goalAmount > 0 &&
    isValidDate(item.date)
  );
}

function loadBudget() {
  const saved = readJson(BUDGET_KEY);
  if (saved && (saved.mode === "fixed" || saved.mode === "smart") && CURRENCIES.includes(saved.currency)) {
    return {
      mode: saved.mode,
      currency: saved.currency,
      dailyLimit: Number.isFinite(saved.dailyLimit) && saved.dailyLimit >= 0 ? saved.dailyLimit : 0,
      monthlyLimit: Number.isFinite(saved.monthlyLimit) && saved.monthlyLimit >= 0 ? saved.monthlyLimit : 0,
    };
  }
  const legacy = readJson(LEGACY_BUDGET_KEY);
  if (legacy && Number.isFinite(legacy.amount) && legacy.amount > 0 && CURRENCIES.includes(legacy.currency)) {
    return { mode: "fixed", currency: legacy.currency, dailyLimit: legacy.amount, monthlyLimit: 0 };
  }
  return { mode: "fixed", currency: "HKD", dailyLimit: 0, monthlyLimit: 0 };
}

function loadTemplates() {
  const saved = readJson(TEMPLATES_KEY);
  if (!Array.isArray(saved)) return [];
  return saved.filter((item) =>
    item &&
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    Number.isFinite(item.amount) &&
    item.amount > 0 &&
    CURRENCIES.includes(item.currency) &&
    CATEGORY_IDS.includes(item.category)
  );
}

function formatCurrency(amount, currency) {
  const formatted = new Intl.NumberFormat(locale(), {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));
  const symbol = currency === "HKD" ? "HK$" : "¥";
  return `${amount < 0 ? "−" : ""}${symbol}${formatted}`;
}

function convertAmount(amount, fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) return amount;
  return fromCurrency === "HKD" ? amount * exchangeRate : amount / exchangeRate;
}

function displayDate(date) {
  const [year, month, day] = date.split("-");
  return `${year}/${month}/${day}`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

function accountName(account) {
  if (account.id === DEFAULT_ACCOUNT_IDS.HKD) return t("defaultHkd");
  if (account.id === DEFAULT_ACCOUNT_IDS.CNY) return t("defaultCny");
  return account.name;
}

function accountById(id) {
  return accounts.find((account) => account.id === id);
}

function getDefaultAccount(currency) {
  const currencyAccounts = accounts.filter((account) => account.currency === currency);
  return currencyAccounts.find((account) => account.kind === "daily") ||
    currencyAccounts[0] ||
    accounts.find((account) => account.id === DEFAULT_ACCOUNT_IDS[currency]);
}

function accountTransactionNet(accountId) {
  return transactions
    .filter((item) => item.accountId === accountId)
    .reduce((sum, item) => sum + item.amount * (item.type === "income" ? 1 : -1), 0);
}

function accountTransferNet(accountId) {
  return transfers
    .filter((item) => item.sourceAccountId === accountId)
    .reduce((sum, item) => sum - item.sourceAmount, 0);
}

function accountBalance(account) {
  return account.baseBalance + accountTransactionNet(account.id) + accountTransferNet(account.id);
}

function accountTotals() {
  return accounts.reduce((totals, account) => {
    totals[account.currency] += accountBalance(account);
    return totals;
  }, { HKD: 0, CNY: 0 });
}

function netWorth(currency = displayCurrency) {
  const totals = accountTotals();
  const goalsByCurrency = goals.reduce((sum, goal) => {
    sum[goal.currency] += goal.saved;
    return sum;
  }, { HKD: 0, CNY: 0 });
  totals.HKD += goalsByCurrency.HKD;
  totals.CNY += goalsByCurrency.CNY;
  return currency === "HKD"
    ? totals.HKD + totals.CNY / exchangeRate
    : totals.HKD * exchangeRate + totals.CNY;
}

function reportRange() {
  const today = localDateString();
  if (reportPeriod === "custom") {
    return {
      start: document.querySelector("#report-start").value,
      end: document.querySelector("#report-end").value,
    };
  }
  if (reportPeriod === "month") {
    const date = new Date();
    return {
      start: localDateString(new Date(date.getFullYear(), date.getMonth(), 1)),
      end: localDateString(new Date(date.getFullYear(), date.getMonth() + 1, 0)),
    };
  }
  const date = new Date(`${today}T00:00:00`);
  date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
  return { start: localDateString(date), end: shiftDate(localDateString(date), 6) };
}

function filteredReportTransactions() {
  const range = reportRange();
  const query = document.querySelector("#note-search").value.trim().toLocaleLowerCase(locale());
  return transactions.filter((item) =>
    (!range.start || item.date >= range.start) &&
    (!range.end || item.date <= range.end) &&
    (!query || item.note.toLocaleLowerCase(locale()).includes(query))
  );
}

function eligibleExpense(item) {
  const account = accountById(item.accountId);
  return item.type === "expense" && account?.kind === "daily" && account.includeInBudget;
}

function spendingForDate(date, currency) {
  return transactions
    .filter((item) => item.date === date && eligibleExpense(item))
    .reduce((sum, item) => sum + convertAmount(item.amount, item.currency, currency), 0);
}

function monthlyBudgetSpendBeforeToday(currency) {
  const date = new Date();
  const start = localDateString(new Date(date.getFullYear(), date.getMonth(), 1));
  const today = localDateString();
  return transactions
    .filter((item) => item.date >= start && item.date < today && eligibleExpense(item))
    .reduce((sum, item) => sum + convertAmount(item.amount, item.currency, currency), 0);
}

function currentBudgetState() {
  const today = localDateString();
  const spent = spendingForDate(today, budget.currency);
  let limit = budget.dailyLimit;
  if (budget.mode === "smart") {
    const now = new Date();
    const monthDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const daysRemaining = monthDays - now.getDate() + 1;
    const remaining = Math.max(0, budget.monthlyLimit - monthlyBudgetSpendBeforeToday(budget.currency));
    limit = daysRemaining > 0 ? remaining / daysRemaining : 0;
  }
  return {
    spent,
    limit,
    remaining: limit - spent,
    ratio: limit > 0 ? spent / limit : 0,
  };
}

function renderStatus() {
  const state = currentBudgetState();
  const value = document.querySelector("#budget-status-value");
  const detail = document.querySelector("#budget-status-detail");
  const fill = document.querySelector("#budget-status-fill");
  budgetStatus.classList.remove("is-warning", "is-over");

  if (state.limit <= 0 && budget.mode === "fixed") {
    value.textContent = t("noBudget");
    detail.textContent = t("setBudgetHint");
    fill.style.width = "0%";
  } else {
    value.textContent = state.remaining >= 0
      ? interpolate(t("budgetLeft"), { amount: formatCurrency(state.remaining, budget.currency) })
      : interpolate(t("budgetOver"), { amount: formatCurrency(Math.abs(state.remaining), budget.currency) });
    detail.textContent = interpolate(t("budgetSpent"), {
      spent: formatCurrency(state.spent, budget.currency),
      limit: formatCurrency(state.limit, budget.currency),
    });
    fill.style.width = `${Math.min(100, Math.max(0, state.ratio * 100))}%`;
    if (state.ratio > 1) {
      budgetStatus.classList.add("is-over");
      detail.textContent = t("budgetWarning").replace("{amount}", formatCurrency(Math.abs(state.remaining), budget.currency));
    } else if (state.ratio >= 0.8) {
      budgetStatus.classList.add("is-warning");
    }
  }

  if (budget.mode === "smart" && budget.monthlyLimit > 0) {
    detail.textContent += ` · ${t("smartBudget")}`;
  }

  const totals = accountTotals();
  const hkdWorth = totals.HKD + goals.filter((goal) => goal.currency === "HKD").reduce((sum, goal) => sum + goal.saved, 0);
  const cnyWorth = totals.CNY + goals.filter((goal) => goal.currency === "CNY").reduce((sum, goal) => sum + goal.saved, 0);
  document.querySelector("#net-worth-value").textContent = formatCurrency(netWorth(), displayCurrency);
  document.querySelector("#net-worth-detail").textContent =
    `${formatCurrency(hkdWorth, "HKD")} · ${formatCurrency(cnyWorth, "CNY")}`;
  document.querySelector("#net-worth-toggle").textContent =
    displayCurrency === "HKD" ? "HK$ / ¥" : "¥ / HK$";
}

function setCategory(category) {
  if (!CATEGORY_IDS.includes(category)) return;
  categoryInput.value = category;
  document.querySelectorAll(".category-pill").forEach((button) => {
    const selected = button.dataset.category === category;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function setSelectedDate(mode) {
  if (mode === "today") selectedDate = localDateString();
  else if (mode === "yesterday") selectedDate = shiftDate(localDateString(), -1);
  else selectedDate = dateInput.value || localDateString();
  dateInput.value = selectedDate;
  const isCustom = mode === "custom";
  dateInput.hidden = !isCustom;
  document.querySelectorAll(".date-chip").forEach((button) => {
    const active = button.dataset.dateMode === mode;
    button.classList.toggle("is-selected", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (isCustom) dateInput.focus();
}

function renderAccountPicker() {
  const wrap = document.querySelector("#account-picker-wrap");
  const select = document.querySelector("#entry-account");
  const matching = accounts.filter((account) => account.currency === currencyInput.value);
  const preferred = matching.find((account) => account.id === select.value) ||
    matching.find((account) => account.kind === "daily") ||
    matching[0];
  select.replaceChildren();
  matching.forEach((account) => {
    const option = document.createElement("option");
    option.value = account.id;
    option.textContent = accountName(account);
    select.append(option);
  });
  if (preferred) select.value = preferred.id;
  wrap.hidden = matching.length < 2;
}

function renderRecent() {
  const recent = transactions
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id))
    .slice(0, 8);
  transactionList.replaceChildren();
  if (!transactions.length) {
    const empty = document.createElement("p");
    empty.className = "recent-empty";
    empty.textContent = t("noTransactions");
    transactionList.append(empty);
  } else if (!recent.length) {
    const empty = document.createElement("p");
    empty.className = "recent-empty";
    empty.textContent = t("noRecent");
    transactionList.append(empty);
  }
  recent.forEach((item) => {
    const account = accountById(item.accountId);
    const row = document.createElement("article");
    row.className = "recent-row";
    const categoryIcon = document.createElement("span");
    categoryIcon.className = `recent-category-icon category-${item.category}`;
    categoryIcon.textContent = categoryIconText(item.category);
    categoryIcon.setAttribute("aria-hidden", "true");
    const details = document.createElement("div");
    details.className = "recent-details";
    const name = document.createElement("strong");
    name.textContent = item.note || MESSAGES[language].categories[item.category];
    const meta = document.createElement("span");
    meta.textContent = `${MESSAGES[language].categories[item.category]} · ${displayDate(item.date)}${account && accounts.length > 2 ? ` · ${accountName(account)}` : ""}`;
    details.append(name, meta);
    const amount = document.createElement("strong");
    amount.className = item.type === "income" ? "recent-amount income" : "recent-amount";
    amount.textContent = `${item.type === "income" ? "+" : "−"}${formatCurrency(item.amount, item.currency)}`;
    const remove = document.createElement("button");
    remove.className = "recent-delete";
    remove.type = "button";
    remove.dataset.deleteId = item.id;
    remove.textContent = "×";
    remove.title = t("deleteTitle");
    remove.setAttribute("aria-label", interpolate(t("deleteRecord"), {
      date: displayDate(item.date),
      category: MESSAGES[language].categories[item.category],
    }));
    row.append(categoryIcon, details, amount, remove);
    transactionList.append(row);
  });
  document.querySelector("#recent-count").textContent =
    interpolate(t("recordsCount"), { count: transactions.length });
}

function categoryIconText(category) {
  return {
    food: "🍽",
    transport: "🚇",
    learning: "📚",
    shopping: "🛍",
    leisure: "🎧",
    other: "✦",
  }[category];
}

function renderAccounts() {
  accountList.replaceChildren();
  accounts.forEach((account) => {
    const card = document.createElement("article");
    card.className = "account-card";
    card.dataset.accountId = account.id;
    const heading = document.createElement("div");
    heading.className = "account-card-heading";
    const title = document.createElement("strong");
    title.textContent = accountName(account);
    const currencyTag = document.createElement("span");
    currencyTag.className = "currency-badge";
    currencyTag.textContent = account.currency === "HKD" ? "HK$" : "¥";
    heading.append(title, currencyTag);

    const controls = document.createElement("div");
    controls.className = "account-controls";
    const kindLabel = document.createElement("label");
    kindLabel.className = "compact-setting";
    const kindTitle = document.createElement("span");
    kindTitle.textContent = t("accountKindLabel");
    const kind = document.createElement("select");
    kind.dataset.accountKind = "";
    [["daily", t("dailyAccount")], ["savings", t("savingsAccount")]].forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      kind.append(option);
    });
    kind.value = account.kind;
    kindLabel.append(kindTitle, kind);

    const budgetLabel = document.createElement("label");
    budgetLabel.className = "setting-check account-budget-check";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.accountBudget = "";
    checkbox.checked = account.kind === "daily" && account.includeInBudget;
    checkbox.disabled = account.kind === "savings";
    const checkboxText = document.createElement("span");
    checkboxText.textContent = t("includedInBudget");
    budgetLabel.append(checkbox, checkboxText);
    controls.append(kindLabel, budgetLabel);

    const balanceForm = document.createElement("form");
    balanceForm.className = "account-balance-form";
    balanceForm.dataset.accountForm = "";
    const balanceLabel = document.createElement("label");
    balanceLabel.className = "account-balance-label";
    const currentText = document.createElement("span");
    currentText.textContent = t("currentBalance");
    const currentAmount = document.createElement("strong");
    currentAmount.textContent = formatCurrency(accountBalance(account), account.currency);
    balanceLabel.append(currentText, currentAmount);
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.step = "0.01";
    input.inputMode = "decimal";
    input.value = accountBalance(account).toFixed(2);
    input.dataset.accountBalance = "";
    input.setAttribute("aria-label", `${t("currentBalance")} ${accountName(account)}`);
    const save = document.createElement("button");
    save.className = "secondary-button";
    save.type = "submit";
    save.textContent = t("saveBalance");
    balanceForm.append(balanceLabel, input, save);
    card.append(heading, controls, balanceForm);
    accountList.append(card);
  });
}

function renderGoals() {
  goalList.replaceChildren();
  if (!goals.length) {
    const empty = document.createElement("p");
    empty.className = "muted-empty";
    empty.textContent = t("noGoals");
    goalList.append(empty);
  }
  goals.forEach((goal) => {
    const card = document.createElement("article");
    card.className = "goal-card";
    const head = document.createElement("div");
    head.className = "goal-card-head";
    const name = document.createElement("strong");
    name.textContent = goal.name;
    const amounts = document.createElement("span");
    amounts.textContent = `${formatCurrency(goal.saved, goal.currency)} / ${formatCurrency(goal.target, goal.currency)}`;
    head.append(name, amounts);
    const track = document.createElement("div");
    track.className = "goal-track";
    const fill = document.createElement("span");
    const percent = Math.max(0, Math.min(100, goal.saved / goal.target * 100));
    fill.style.width = `${percent}%`;
    track.append(fill);
    const caption = document.createElement("p");
    caption.className = "goal-progress-caption";
    caption.textContent = goal.saved >= goal.target
      ? t("goalComplete")
      : interpolate(t("goalRemaining"), { amount: formatCurrency(goal.target - goal.saved, goal.currency) });

    const transferForm = document.createElement("form");
    transferForm.className = "goal-transfer-form";
    transferForm.dataset.goalId = goal.id;
    const amount = document.createElement("input");
    amount.type = "number";
    amount.min = "0.01";
    amount.step = "0.01";
    amount.inputMode = "decimal";
    amount.name = "amount";
    amount.placeholder = t("transferAmount");
    amount.setAttribute("aria-label", t("transferAmount"));
    amount.required = true;
    const accountSelect = document.createElement("select");
    accountSelect.name = "accountId";
    accountSelect.setAttribute("aria-label", t("transferFrom"));
    accounts.filter((account) => account.kind === "daily").forEach((account) => {
      const option = document.createElement("option");
      option.value = account.id;
      option.textContent = `${accountName(account)} · ${account.currency === "HKD" ? "HK$" : "¥"}`;
      accountSelect.append(option);
    });
    const submit = document.createElement("button");
    submit.className = "secondary-button";
    submit.type = "submit";
    submit.textContent = t("goalTransfer");
    transferForm.append(amount, accountSelect, submit);
    card.append(head, track, caption, transferForm);
    goalList.append(card);
  });
  document.querySelector("#goal-form button[type=submit]").disabled = goals.length >= 2;
  document.querySelector("#goal-form").hidden = goals.length >= 2;
}

function renderTemplates() {
  recurringList.replaceChildren();
  const shortcutWrap = document.querySelector("#template-shortcuts");
  const shortcutList = document.querySelector("#quick-templates");
  shortcutList.replaceChildren();
  shortcutWrap.hidden = templates.length === 0;
  if (!templates.length) {
    const empty = document.createElement("p");
    empty.className = "muted-empty";
    empty.textContent = t("noTemplates");
    recurringList.append(empty);
  }
  templates.forEach((template) => {
    const row = document.createElement("div");
    row.className = "recurring-row";
    const title = document.createElement("div");
    title.className = "recurring-description";
    const name = document.createElement("strong");
    name.textContent = template.name;
    const details = document.createElement("span");
    details.textContent = `${formatCurrency(template.amount, template.currency)} · ${MESSAGES[language].categories[template.category]}`;
    title.append(name, details);
    const use = document.createElement("button");
    use.type = "button";
    use.className = "text-button";
    use.dataset.useTemplate = template.id;
    use.textContent = t("useTemplate");
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "icon-button small-icon-button";
    remove.dataset.removeTemplate = template.id;
    remove.textContent = "×";
    remove.title = t("removeTemplate");
    row.append(title, use, remove);
    recurringList.append(row);

    const shortcut = document.createElement("button");
    shortcut.type = "button";
    shortcut.className = "template-chip";
    shortcut.dataset.useTemplate = template.id;
    shortcut.textContent = `${template.name} · ${formatCurrency(template.amount, template.currency)}`;
    shortcutList.append(shortcut);
  });
}

function renderReports() {
  const filtered = filteredReportTransactions();
  const expenses = filtered.filter((item) => item.type === "expense");
  document.querySelector("#report-count").textContent =
    interpolate(t("reportCount"), { count: filtered.length });

  const totals = new Map(CATEGORY_IDS.map((category) => [category, 0]));
  expenses.forEach((item) => totals.set(
    item.category,
    totals.get(item.category) + convertAmount(item.amount, item.currency, displayCurrency),
  ));
  const categories = CATEGORY_IDS.filter((category) => totals.get(category) > 0);
  document.querySelector("#category-chart-empty").hidden = categories.length > 0;
  document.querySelector("#report-category-chart").hidden = categories.length === 0;
  if (categoryChart) {
    categoryChart.destroy();
    categoryChart = null;
  }
  if (categories.length && typeof Chart !== "undefined") {
    categoryChart = new Chart(document.querySelector("#report-category-chart"), {
      type: "doughnut",
      data: {
        labels: categories.map((category) => MESSAGES[language].categories[category]),
        datasets: [{
          data: categories.map((category) => totals.get(category)),
          backgroundColor: categories.map((category) => CATEGORY_COLORS[CATEGORY_IDS.indexOf(category)]),
          borderColor: "#fff",
          borderWidth: 3,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "62%",
        plugins: {
          legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 7 } },
          tooltip: {
            callbacks: {
              label(context) {
                return `${context.label}: ${formatCurrency(context.parsed, displayCurrency)}`;
              },
            },
          },
        },
      },
    });
  }

  const trendDates = Array.from({ length: 7 }, (_, index) => shiftDate(localDateString(), index - 6));
  const trendValues = trendDates.map((date) =>
    transactions
      .filter((item) => item.type === "expense" && item.date === date)
      .reduce((sum, item) => sum + convertAmount(item.amount, item.currency, displayCurrency), 0)
  );
  const hasTrend = trendValues.some((value) => value > 0);
  document.querySelector("#trend-chart-empty").hidden = hasTrend;
  document.querySelector("#trend-chart").hidden = !hasTrend;
  if (trendChart) {
    trendChart.destroy();
    trendChart = null;
  }
  if (hasTrend && typeof Chart !== "undefined") {
    const labels = trendDates.map((date) =>
      new Intl.DateTimeFormat(locale(), { weekday: "short", day: "numeric" }).format(new Date(`${date}T00:00:00`))
    );
    trendChart = new Chart(document.querySelector("#trend-chart"), {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: t("trendReport"),
          data: trendValues,
          borderColor: "#5c8a70",
          backgroundColor: "rgb(92 138 112 / 13%)",
          fill: true,
          tension: 0.34,
          pointRadius: 3,
          pointHoverRadius: 5,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label(context) {
                return formatCurrency(context.parsed.y, displayCurrency);
              },
            },
          },
        },
        scales: {
          y: { beginAtZero: true, ticks: { maxTicksLimit: 5 } },
          x: { grid: { display: false } },
        },
      },
    });
  }

  if ((categories.length || hasTrend) && typeof Chart === "undefined" && !chartWarningShown) {
    chartWarningShown = true;
    showToast(t("chartLoadError"));
  }
}

function render() {
  renderStatus();
  renderRecent();
  renderAccountPicker();
  renderAccounts();
  renderGoals();
  renderTemplates();
  renderReports();
}

function applyLanguage() {
  const messages = MESSAGES[language];
  document.documentElement.lang = language;
  document.title = messages.appName;
  document.querySelector('meta[name="description"]').content = messages.metaDescription;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = messages[element.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", messages[element.dataset.i18nAria]);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = messages[element.dataset.i18nPlaceholder];
  });
  document.querySelectorAll("[data-i18n-content]").forEach((element) => {
    element.content = messages[element.dataset.i18nContent];
  });
  document.querySelectorAll("[data-category-label]").forEach((element) => {
    element.textContent = messages.categories[element.dataset.categoryLabel];
  });
  document.querySelectorAll("[data-category-option]").forEach((element) => {
    element.textContent = messages.categories[element.dataset.categoryOption];
  });
  document.querySelectorAll(".language-button").forEach((button) => {
    const active = button.dataset.language === language;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelector("#exchange-rate").value = String(exchangeRate);
  document.querySelector("#amount-currency").textContent = currencyInput.value === "HKD" ? "HK$" : "¥";
  document.querySelector("#today-label").textContent =
    new Intl.DateTimeFormat(locale(), { year: "numeric", month: "long", day: "numeric" }).format(new Date());
  document.querySelectorAll(".dialog-tab").forEach((button) => {
    const selected = button.dataset.panelTab === (reportsView.hidden ? "finance" : "reports");
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-selected", String(selected));
  });
  document.querySelector("#dialog-title").textContent = reportsView.hidden ? t("financeCenter") : t("reportsTitle");
  render();
}

function persistTransactions(nextTransactions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTransactions));
    transactions = nextTransactions;
    return true;
  } catch (error) {
    showToast(interpolate(t("storageSaveError"), { error: error.message }));
    return false;
  }
}

function addTransaction({ amount, currency, category, type = "expense", date = localDateString(), note = "", accountId = "" }) {
  const account = accountById(accountId) || getDefaultAccount(currency);
  if (!account || account.currency !== currency) {
    showToast(t("invalidEntry"));
    return false;
  }
  const next = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    type,
    amount: Math.round(amount * 100) / 100,
    currency,
    category,
    date,
    note: String(note).trim(),
    accountId: account.id,
  };
  if (!persistTransactions([...transactions, next])) return false;
  render();
  showToast(t("added"));
  return true;
}

function downloadFile(filename, contents, type) {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function csvCell(value) {
  let text = String(value);
  if (/^[\t\r ]*[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

function exportCsv() {
  const headers = [t("csvDate"), t("csvType"), t("csvCategory"), t("csvCurrency"), t("csvAmount"), t("csvAccount"), t("csvNote")];
  const rows = transactions
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id))
    .map((item) => [
      item.date,
      item.type === "income" ? t("income") : t("expense"),
      MESSAGES[language].categories[item.category],
      item.currency,
      item.amount.toFixed(2),
      accountName(accountById(item.accountId) || { id: "", name: "" }),
      item.note,
    ]);
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
  downloadFile(`daily-ledger-${localDateString()}.csv`, `\uFEFF${csv}`, "text/csv;charset=utf-8;");
  showToast(t("csvExported"));
}

function exportJson() {
  const payload = {
    format: "daily-ledger-backup",
    version: 2,
    exportedAt: new Date().toISOString(),
    language,
    exchangeRate,
    displayCurrency,
    transactions,
    accounts,
    goals,
    transfers,
    budget,
    templates,
  };
  downloadFile(
    `daily-ledger-backup-${localDateString()}.json`,
    JSON.stringify(payload, null, 2),
    "application/json;charset=utf-8;",
  );
  showToast(t("jsonExported"));
}

function validateBackup(data) {
  if (!data || data.format !== "daily-ledger-backup" || data.version !== 2) {
    throw new Error(t("invalidBackup"));
  }
  if (
    !Array.isArray(data.accounts) ||
    !Array.isArray(data.transactions) ||
    !Array.isArray(data.goals) ||
    !Array.isArray(data.transfers) ||
    !Array.isArray(data.templates) ||
    data.goals.length > 2 ||
    !Number.isFinite(data.exchangeRate) ||
    data.exchangeRate <= 0 ||
    !CURRENCIES.includes(data.displayCurrency) ||
    !LANGUAGES.includes(data.language)
  ) throw new Error(t("invalidBackup"));

  const accountIds = new Set();
  const importedAccounts = data.accounts.filter((account) => {
    const valid = account &&
      typeof account.id === "string" &&
      typeof account.name === "string" &&
      CURRENCIES.includes(account.currency) &&
      (account.kind === "daily" || account.kind === "savings") &&
      Number.isFinite(account.baseBalance) &&
      typeof account.includeInBudget === "boolean" &&
      !accountIds.has(account.id);
    if (valid) accountIds.add(account.id);
    return valid;
  });
  if (importedAccounts.length !== data.accounts.length ||
    !Object.values(DEFAULT_ACCOUNT_IDS).every((id) => accountIds.has(id))) {
    throw new Error(t("invalidBackup"));
  }

  const importedTransactions = data.transactions.map((item) => normalizeTransaction(item, accountIds));
  if (importedTransactions.some((item) => !item)) throw new Error(t("invalidBackup"));
  const importedGoals = data.goals.filter((goal) =>
    goal &&
    typeof goal.id === "string" &&
    typeof goal.name === "string" &&
    Number.isFinite(goal.target) &&
    goal.target > 0 &&
    Number.isFinite(goal.saved) &&
    goal.saved >= 0 &&
    CURRENCIES.includes(goal.currency)
  );
  if (importedGoals.length !== data.goals.length) throw new Error(t("invalidBackup"));
  const goalIds = new Set(importedGoals.map((goal) => goal.id));
  const importedTransfers = data.transfers.filter((item) =>
    item &&
    typeof item.id === "string" &&
    accountIds.has(item.sourceAccountId) &&
    goalIds.has(item.goalId) &&
    Number.isFinite(item.sourceAmount) &&
    item.sourceAmount > 0 &&
    Number.isFinite(item.goalAmount) &&
    item.goalAmount > 0 &&
    isValidDate(item.date)
  );
  if (importedTransfers.length !== data.transfers.length) throw new Error(t("invalidBackup"));
  const importedTemplates = data.templates.filter((item) =>
    item &&
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    Number.isFinite(item.amount) &&
    item.amount > 0 &&
    CURRENCIES.includes(item.currency) &&
    CATEGORY_IDS.includes(item.category)
  );
  if (importedTemplates.length !== data.templates.length) throw new Error(t("invalidBackup"));
  const importedBudget = data.budget;
  if (
    !importedBudget ||
    !["fixed", "smart"].includes(importedBudget.mode) ||
    !CURRENCIES.includes(importedBudget.currency) ||
    !Number.isFinite(importedBudget.dailyLimit) ||
    importedBudget.dailyLimit < 0 ||
    !Number.isFinite(importedBudget.monthlyLimit) ||
    importedBudget.monthlyLimit < 0
  ) throw new Error(t("invalidBackup"));

  return {
    accounts: importedAccounts,
    transactions: importedTransactions,
    goals: importedGoals,
    transfers: importedTransfers,
    templates: importedTemplates,
    budget: importedBudget,
  };
}

async function importJson(file) {
  if (!window.confirm(t("confirmImport"))) return;
  try {
    const data = JSON.parse(await file.text());
    const imported = validateBackup(data);
    const settings = [
      [STORAGE_KEY, JSON.stringify(imported.transactions)],
      [ACCOUNTS_KEY, JSON.stringify(imported.accounts)],
      [GOALS_KEY, JSON.stringify(imported.goals)],
      [TRANSFERS_KEY, JSON.stringify(imported.transfers)],
      [BUDGET_KEY, JSON.stringify(imported.budget)],
      [TEMPLATES_KEY, JSON.stringify(imported.templates)],
      [RATE_KEY, String(data.exchangeRate)],
      [DISPLAY_CURRENCY_KEY, data.displayCurrency],
      [LANGUAGE_KEY, data.language],
    ];
    if (!atomicWrite(settings)) return;
    transactions = imported.transactions;
    accounts = imported.accounts;
    goals = imported.goals;
    transfers = imported.transfers;
    budget = imported.budget;
    templates = imported.templates;
    exchangeRate = data.exchangeRate;
    displayCurrency = data.displayCurrency;
    language = data.language;
    render();
    applyLanguage();
    showToast(t("importSuccess"));
  } catch (error) {
    showToast(interpolate(t("importError"), { error: error.message }));
  }
}

function openDialog(panel) {
  financeView.hidden = panel !== "finance";
  reportsView.hidden = panel !== "reports";
  applyLanguage();
  if (!dialog.open) dialog.showModal();
  document.querySelector(`[data-panel-tab="${panel}"]`).focus();
}

function setCurrencyDisplay() {
  document.querySelector("#amount-currency").textContent = currencyInput.value === "HKD" ? "HK$" : "¥";
  renderAccountPicker();
}

function persistAccountAndTransfers(nextAccounts, nextTransfers) {
  if (!atomicWrite([
    [ACCOUNTS_KEY, JSON.stringify(nextAccounts)],
    [TRANSFERS_KEY, JSON.stringify(nextTransfers)],
  ])) return false;
  accounts = nextAccounts;
  transfers = nextTransfers;
  return true;
}

form.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.target instanceof HTMLInputElement && event.target.type !== "date") {
    event.preventDefault();
    form.requestSubmit();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const amount = Number(amountInput.value);
  if (!Number.isFinite(amount) || amount <= 0 || !CURRENCIES.includes(currencyInput.value) || !isValidDate(dateInput.value)) {
    showToast(t("invalidEntry"));
    amountInput.focus();
    return;
  }
  const success = addTransaction({
    amount,
    currency: currencyInput.value,
    category: categoryInput.value,
    type: new FormData(form).get("type"),
    date: dateInput.value,
    note: document.querySelector("#note").value,
    accountId: document.querySelector("#entry-account").value,
  });
  if (!success) return;
  amountInput.value = "";
  document.querySelector("#note").value = "";
  setSelectedDate("today");
  amountInput.focus();
});

document.querySelectorAll(".category-pill").forEach((button) => {
  button.addEventListener("click", () => setCategory(button.dataset.category));
});

document.querySelectorAll(".date-chip").forEach((button) => {
  button.addEventListener("click", () => setSelectedDate(button.dataset.dateMode));
});

dateInput.addEventListener("change", () => {
  selectedDate = dateInput.value;
});

currencyInput.addEventListener("change", setCurrencyDisplay);

transactionList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-id]");
  if (!button) return;
  const next = transactions.filter((item) => item.id !== button.dataset.deleteId);
  if (persistTransactions(next)) render();
});

document.querySelectorAll("[data-open-panel]").forEach((button) => {
  button.addEventListener("click", () => openDialog(button.dataset.openPanel));
});

document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelectorAll(".dialog-tab").forEach((button) => {
  button.addEventListener("click", () => {
    financeView.hidden = button.dataset.panelTab !== "finance";
    reportsView.hidden = button.dataset.panelTab !== "reports";
    applyLanguage();
  });
});

document.querySelectorAll(".language-button").forEach((button) => {
  button.addEventListener("click", () => {
    const nextLanguage = button.dataset.language;
    if (!LANGUAGES.includes(nextLanguage) || nextLanguage === language) return;
    if (!writeStorage(LANGUAGE_KEY, nextLanguage)) return;
    language = nextLanguage;
    applyLanguage();
  });
});

document.querySelector("#net-worth-toggle").addEventListener("click", () => {
  const nextCurrency = displayCurrency === "HKD" ? "CNY" : "HKD";
  if (!writeStorage(DISPLAY_CURRENCY_KEY, nextCurrency)) return;
  displayCurrency = nextCurrency;
  render();
});

document.querySelector("#exchange-rate").addEventListener("input", (event) => {
  const value = Number(event.currentTarget.value);
  if (!Number.isFinite(value) || value <= 0) return;
  if (!writeStorage(RATE_KEY, String(value))) {
    event.currentTarget.value = String(exchangeRate);
    return;
  }
  exchangeRate = value;
  render();
});

document.querySelector("#exchange-rate").addEventListener("change", (event) => {
  const value = Number(event.currentTarget.value);
  if (!event.currentTarget.value || !Number.isFinite(value) || value <= 0) {
    event.currentTarget.value = String(exchangeRate);
    showToast(t("invalidRate"));
  }
});

budgetForm.addEventListener("change", (event) => {
  if (event.target.id === "smart-budget") {
    document.querySelector("#daily-limit").disabled = event.target.checked;
    document.querySelector("#monthly-limit").disabled = !event.target.checked;
  }
});

budgetForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const smart = document.querySelector("#smart-budget").checked;
  const dailyLimit = Number(document.querySelector("#daily-limit").value || 0);
  const monthlyLimit = Number(document.querySelector("#monthly-limit").value || 0);
  const currency = document.querySelector("#budget-currency").value;
  if (
    !CURRENCIES.includes(currency) ||
    (smart ? monthlyLimit <= 0 : dailyLimit <= 0) ||
    !Number.isFinite(dailyLimit) ||
    !Number.isFinite(monthlyLimit)
  ) {
    showToast(t("budgetRequiresLimit"));
    return;
  }
  const nextBudget = {
    mode: smart ? "smart" : "fixed",
    currency,
    dailyLimit: Math.max(0, dailyLimit),
    monthlyLimit: Math.max(0, monthlyLimit),
  };
  if (!writeJson(BUDGET_KEY, nextBudget)) return;
  budget = nextBudget;
  renderStatus();
  showToast(t("budgetSaved"));
});

accountList.addEventListener("submit", (event) => {
  const formElement = event.target.closest("[data-account-form]");
  if (!formElement) return;
  event.preventDefault();
  const card = formElement.closest(".account-card");
  const account = accountById(card.dataset.accountId);
  const desiredBalance = Number(formElement.querySelector("[data-account-balance]").value);
  if (!account || !Number.isFinite(desiredBalance) || desiredBalance < 0) {
    showToast(t("invalidAccount"));
    return;
  }
  const nextAccounts = accounts.map((current) => {
    if (current.id !== account.id) return current;
    const kind = card.querySelector("[data-account-kind]").value;
    const includeInBudget = kind === "daily" && card.querySelector("[data-account-budget]").checked;
    const activity = accountTransactionNet(current.id) + accountTransferNet(current.id);
    return {
      ...current,
      kind,
      includeInBudget,
      baseBalance: desiredBalance - activity,
    };
  });
  if (!writeJson(ACCOUNTS_KEY, nextAccounts)) return;
  accounts = nextAccounts;
  render();
  showToast(t("accountSaved"));
});

document.querySelector("#account-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get("name") || "").trim();
  const currency = String(data.get("currency"));
  const kind = String(data.get("kind"));
  const balance = Number(data.get("balance"));
  if (!name || !CURRENCIES.includes(currency) || !["daily", "savings"].includes(kind) || !Number.isFinite(balance) || balance < 0) {
    showToast(t("invalidAccount"));
    return;
  }
  const nextAccounts = [...accounts, {
    id: `account-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name,
    currency,
    kind,
    baseBalance: balance,
    includeInBudget: kind === "daily",
  }];
  if (!writeJson(ACCOUNTS_KEY, nextAccounts)) return;
  accounts = nextAccounts;
  event.currentTarget.reset();
  render();
  showToast(t("accountAdded"));
});

document.querySelector("#goal-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (goals.length >= 2) {
    showToast(t("goalLimit"));
    return;
  }
  const data = new FormData(event.currentTarget);
  const name = String(data.get("name") || "").trim();
  const target = Number(data.get("target"));
  const currency = String(data.get("currency"));
  if (!name || !Number.isFinite(target) || target <= 0 || !CURRENCIES.includes(currency)) {
    showToast(t("invalidEntry"));
    return;
  }
  const nextGoals = [...goals, {
    id: `goal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name,
    target: Math.round(target * 100) / 100,
    currency,
    saved: 0,
  }];
  if (!writeJson(GOALS_KEY, nextGoals)) return;
  goals = nextGoals;
  event.currentTarget.reset();
  render();
  showToast(t("goalAdded"));
});

goalList.addEventListener("submit", (event) => {
  const transferForm = event.target.closest(".goal-transfer-form");
  if (!transferForm) return;
  event.preventDefault();
  const data = new FormData(transferForm);
  const sourceAmount = Number(data.get("amount"));
  const sourceAccount = accountById(String(data.get("accountId")));
  const goal = goals.find((item) => item.id === transferForm.dataset.goalId);
  if (!Number.isFinite(sourceAmount) || sourceAmount <= 0 || !sourceAccount || !goal) {
    showToast(t("invalidTransfer"));
    return;
  }
  if (sourceAmount > accountBalance(sourceAccount)) {
    showToast(t("transferTooMuch"));
    return;
  }
  const goalAmount = convertAmount(sourceAmount, sourceAccount.currency, goal.currency);
  const nextAccounts = accounts.slice();
  const nextGoals = goals.map((item) =>
    item.id === goal.id ? { ...item, saved: item.saved + goalAmount } : item
  );
  const transfer = {
    id: `transfer-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    sourceAccountId: sourceAccount.id,
    sourceAmount,
    goalId: goal.id,
    goalAmount,
    date: localDateString(),
  };
  if (!atomicWrite([
    [ACCOUNTS_KEY, JSON.stringify(nextAccounts)],
    [GOALS_KEY, JSON.stringify(nextGoals)],
    [TRANSFERS_KEY, JSON.stringify([...transfers, transfer])],
  ])) return;
  accounts = nextAccounts;
  goals = nextGoals;
  transfers.push(transfer);
  transferForm.reset();
  render();
  showToast(interpolate(t("transferred"), { amount: formatCurrency(goalAmount, goal.currency) }));
});

document.querySelector("#template-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get("name") || "").trim();
  const amount = Number(data.get("amount"));
  const currency = String(data.get("currency"));
  const category = String(data.get("category"));
  if (!name || !Number.isFinite(amount) || amount <= 0 || !CURRENCIES.includes(currency) || !CATEGORY_IDS.includes(category)) {
    showToast(t("invalidEntry"));
    return;
  }
  const next = [...templates, {
    id: `template-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name,
    amount: Math.round(amount * 100) / 100,
    currency,
    category,
  }];
  if (!writeJson(TEMPLATES_KEY, next)) return;
  templates = next;
  event.currentTarget.reset();
  renderTemplates();
  showToast(t("templateAdded"));
});

function activateTemplate(id) {
  const template = templates.find((item) => item.id === id);
  if (!template) return;
  addTransaction({
    amount: template.amount,
    currency: template.currency,
    category: template.category,
    type: "expense",
    date: localDateString(),
    note: template.name,
  });
}

document.addEventListener("click", (event) => {
  const useButton = event.target.closest("[data-use-template]");
  if (useButton) activateTemplate(useButton.dataset.useTemplate);
  const removeButton = event.target.closest("[data-remove-template]");
  if (removeButton) {
    const next = templates.filter((item) => item.id !== removeButton.dataset.removeTemplate);
    if (writeJson(TEMPLATES_KEY, next)) {
      templates = next;
      renderTemplates();
    }
  }
});

document.querySelectorAll("[data-report-period]").forEach((button) => {
  button.addEventListener("click", () => {
    reportPeriod = button.dataset.reportPeriod;
    document.querySelectorAll("[data-report-period]").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });
    const custom = document.querySelector("#report-custom-range");
    custom.hidden = reportPeriod !== "custom";
    if (reportPeriod === "custom") {
      const now = new Date();
      const start = document.querySelector("#report-start");
      const end = document.querySelector("#report-end");
      if (!start.value) start.value = localDateString(new Date(now.getFullYear(), now.getMonth(), 1));
      if (!end.value) end.value = localDateString();
    }
    renderReports();
  });
});

document.querySelector("#report-start").addEventListener("change", renderReports);
document.querySelector("#report-end").addEventListener("change", renderReports);
document.querySelector("#note-search").addEventListener("input", renderReports);

document.querySelector("#export-json").addEventListener("click", exportJson);
document.querySelector("#export-csv").addEventListener("click", exportCsv);

document.querySelector("#import-json").addEventListener("change", async (event) => {
  const input = event.currentTarget;
  const [file] = input.files;
  if (!file) return;
  await importJson(file);
  input.value = "";
});

document.querySelector("#clear-data").addEventListener("click", () => {
  if (!transactions.length) return;
  if (!window.confirm(t("confirmClear"))) return;
  if (persistTransactions([])) {
    render();
    showToast(t("cleared"));
  }
});

const existingAssets = readJson(LEGACY_ASSETS_KEY);
if (existingAssets && !readStorage(ACCOUNTS_KEY)) writeJson(ACCOUNTS_KEY, accounts);
const existingGoal = readJson(LEGACY_GOAL_KEY);
if (existingGoal && !readStorage(GOALS_KEY)) writeJson(GOALS_KEY, goals);
const existingBudget = readJson(LEGACY_BUDGET_KEY);
if (existingBudget && !readStorage(BUDGET_KEY)) writeJson(BUDGET_KEY, budget);

document.querySelector("#date").value = selectedDate;
document.querySelector("#exchange-rate").value = String(exchangeRate);
document.querySelector("#daily-limit").value = budget.dailyLimit || "";
document.querySelector("#monthly-limit").value = budget.monthlyLimit || "";
document.querySelector("#budget-currency").value = budget.currency;
document.querySelector("#smart-budget").checked = budget.mode === "smart";
document.querySelector("#daily-limit").disabled = budget.mode === "smart";
document.querySelector("#monthly-limit").disabled = budget.mode !== "smart";
const monthNow = new Date();
document.querySelector("#report-start").value = localDateString(new Date(monthNow.getFullYear(), monthNow.getMonth(), 1));
document.querySelector("#report-end").value = localDateString();
setCategory("food");
setSelectedDate("today");
setCurrencyDisplay();
applyLanguage();
if (storageWarnings.length) showToast(storageWarnings.join("\n"));
storageWarnings = [];
