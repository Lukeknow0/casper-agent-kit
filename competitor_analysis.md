# Casper Agentic Buildathon 2026 — 竞品分析

> 分析日期：2026-06-26
> 数据来源：GitHub 仓库搜索（API）、DoraHacks SSR 元数据
> 已知总 buidl 数：63（DoraHacks 页面数据）
> 本报告覆盖：32 个有公开 GitHub 仓库的项目（约占 51%）
> 未覆盖的 31 个项目可能尚未公开仓库、使用私有仓库、或尚未上传代码

---

## 一、全量项目表格

| # | 项目名 | 方向 | 语言 | 创建日期 | Agent | Casper | x402 | DeFi | RWA | MCP | 完成度 | 强度 |
|---|--------|------|------|----------|-------|--------|------|------|-----|-----|--------|------|
| 1 | ParkFlow-Agent | DeFi/Trading | TS | 06-08 | ✓ | ✓ | ✗ | ✓ | ✗ | ✗ | HIGH | ⭐⭐⭐⭐ |
| 2 | casper-ai-portfolio-agent | DeFi/Portfolio | TS | 06-01 | ✓ | ✓ | ✗ | ✓ | ✗ | ✗ | HIGH | ⭐⭐⭐⭐ |
| 3 | chainleash | DAO/Treasury | C# | 06-05 | ✓ | ✓ | ✗ | ✓ | ✗ | ✗ | HIGH | ⭐⭐⭐⭐ |
| 4 | casper-quorum | DAO/Treasury | TS | 06-10 | ✓ | ✓ | ✗ | ✓ | ✗ | ✗ | HIGH | ⭐⭐⭐⭐ |
| 5 | kismet-bazaar | DeFi/Insurance | TS | 06-12 | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | HIGH | ⭐⭐⭐⭐ |
| 6 | casper-solvent | DeFi/Fund | TS | 06-24 | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | MED | ⭐⭐⭐ |
| 7 | VouchAgent | Trust/Identity | HTML | 06-16 | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | MED | ⭐⭐⭐ |
| 8 | AgentLedger | DevTool/Infra | TS | 06-19 | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | MED | ⭐⭐⭐ |
| 9 | casper-trust-layer | Trust/Identity | TS | 06-17 | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | MED | ⭐⭐⭐ |
| 10 | CasperFlow | DevTool/NoCode | TS | 06-19 | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | MED | ⭐⭐⭐ |
| 11 | casper-audit-trail | DevTool/Audit | TS | 06-22 | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | MED | ⭐⭐⭐ |
| 12 | casper_weather_oracle | RWA/Oracle | Rust | 06-22 | ✓ | ✓ | ✗ | ✗ | ✓ | ✗ | MED | ⭐⭐⭐ |
| 13 | aegis-casper | DeFi/RWA Yield | TS | 06-20 | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | MED | ⭐⭐⭐ |
| 14 | sentinel402 | Security/x402 | Wasm | 06-21 | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | MED | ⭐⭐⭐ |
| 15 | AiFinPay | DeFi/Settlement | Rust | 06-03 | ✓ | ✓ | ✗ | ✓ | ✗ | ✗ | MED | ⭐⭐⭐ |
| 16 | casper-escrow402 | x402/Escrow | TS | 06-18 | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | MED | ⭐⭐⭐ |
| 17 | verity | DeFi/Oracle | TS | 06-17 | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | MED | ⭐⭐⭐ |
| 18 | aegis402 | x402/Risk | TS | 06-17 | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | MED | ⭐⭐⭐ |
| 19 | casper-rwa-agent | RWA/x402 | Rust | 06-08 | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ | MED | ⭐⭐⭐ |
| 20 | custodian | RWA/x402 | TS | 06-17 | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | MED | ⭐⭐⭐ |
| 21 | sasha-x402-kit | x402/DeFi | Go | 06-10 | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | MED | ⭐⭐⭐ |
| 22 | x402-api-casper | x402/API | JS | 06-02 | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | MED | ⭐⭐⭐ |
| 23 | forge-x402-casper | x402/Protocol | TS | 06-19 | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | MED | ⭐⭐⭐ |
| 24 | casper-yield-oracle | DeFi/Yield Oracle | Rust | 06-25 | ✓ | ✓ | ✗ | ✓ | ✗ | ✗ | LOW | ⭐⭐ |
| 25 | Steward | DAO/Treasury | TS | 06-26 | ✓ | ✓ | ✗ | ✓ | ✗ | ✗ | LOW | ⭐⭐ |
| 26 | Pharmaguard-chain | RWA/Compliance | Python | 06-14 | ✓ | ✓ | ✗ | ✗ | ✓ | ✗ | MED | ⭐⭐ |
| 27 | casperguard | RWA/Compliance | HTML | 06-16 | ✓ | ✓ | ✗ | ✗ | ✓ | ✗ | LOW | ⭐ |
| 28 | LuminDev | DeFi/RWA | Python | 06-23 | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | LOW | ⭐ |
| 29 | quittance | RWA/Cashflow | - | 06-22 | ✓ | ✓ | ✗ | ✗ | ✓ | ✗ | VLOW | ⭐ |
| 30 | Dark-Knight2026 | Unknown | Rust | 06-16 | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | LOW | ⭐ |
| 31 | sangamitra22 | Unknown | - | 06-25 | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | VLOW | ⭐ |
| 32 | SKYWEE | Unknown | - | 06-24 | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | VLOW | ⭐ |

---

## 二、分类统计

### 2.1 按大方向归类

| 大方向 | 数量 | 代表项目 | 最强项目 |
|--------|------|----------|----------|
| **Agentic DeFi** (yield/trading/portfolio/fund) | 8 | ParkFlow, casper-ai-portfolio-agent, casper-solvent, aegis-casper, verity, AiFinPay, kismet-bazaar, casper-yield-oracle | ParkFlow-Agent, kismet-bazaar |
| **x402 / Micropayment** | 7 | sentinel402, casper-escrow402, aegis402, sasha-x402-kit, x402-api-casper, forge-x402-casper, casper-rwa-agent | sasha-x402-kit, forge-x402-casper |
| **RWA / Oracle / Compliance** | 7 | casper_weather_oracle, casperguard, Pharmaguard-chain, custodian, quittance, aegis-casper, LuminDev | casper_weather_oracle, custodian |
| **DAO / Governance / Treasury** | 3 | chainleash, casper-quorum, Steward | chainleash, casper-quorum |
| **Trust / Identity / Reputation** | 3 | VouchAgent, casper-trust-layer, AgentLedger | VouchAgent |
| **DevTool / Infra / NoCode** | 3 | CasperFlow, casper-audit-trail, AgentLedger | CasperFlow |
| **Unknown / Weak** | 3 | Dark-Knight2026, sangamitra22, SKYWEE | - |

### 2.2 拥挤度分析

| 方向 | 拥挤度 | 说明 |
|------|--------|------|
| Agentic DeFi | 🔴 高度拥挤 | 最多项目，但质量参差不齐。yield/portfolio/trading 细分都有人做 |
| x402 | 🟡 中度拥挤 | 7 个项目，但大多是"x402 包装"而非真正的支付协议创新 |
| RWA/Oracle | 🟡 中度拥挤 | 7 个项目，但真正有链上验证的很少 |
| DAO/Treasury | 🟢 较少 | 3 个项目，且多数偏概念 |
| Trust/Identity | 🟢 较少 | 3 个项目 |
| DevTool/NoCode | 🟢 极少 | 2-3 个项目 |
| MCP 相关 | ⚪ 几乎没有 | 在 GitHub 上几乎没有找到 MCP Server 相关项目！ |

---

## 三、强项目列表（最可能拿奖的对手）

### Tier 1 — 最强竞争者（高完成度 + 好方向 + 早启动）

1. **ParkFlow-Agent** (06-08 启动，DeFi/Trading)
   - 三角色 swarm 架构（Analyst → Decision → Executor）
   - TypeScript，启动最早，开发时间最长
   - **威胁等级：高**

2. **casper-ai-portfolio-agent** (06-01 启动，DeFi/Portfolio)
   - 最早启动，用 GPT-4o 分析风险
   - TypeScript，完整 agent loop
   - **威胁等级：高**

3. **chainleash** (06-05 启动，DAO/Treasury)
   - C# 实现，bonded protocol-governed agent
   - 唯一的 C# 项目，技术差异化明显
   - **威胁等级：中高**

4. **casper-quorum** (06-10 启动，DAO/Treasury)
   - 多 agent 共识机制
   - **威胁等级：中高**

5. **kismet-bazaar** (06-12 启动，DeFi/Insurance)
   - 参数化保险，创意独特
   - 链上真实赔付逻辑
   - **威胁等级：中高**

### Tier 2 — 中等竞争者

6. **casper-solvent** — 自主基金 agent，x402 集成
7. **CasperFlow** — NoCode agent builder，差异化强
8. **custodian** — RWA + x402 + Gemini，技术栈丰富
9. **AiFinPay** — Rust 智能合约，settlement layer

---

## 四、弱项目列表（可忽略的对手）

- **sangamitra22/casper_agentic_buildathon** — 无描述、无代码
- **SKYWEE** — 无描述、无代码
- **quittance** — 无语言、无代码
- **Dark-Knight2026** — 无描述、仅有骨架
- **casperguard** — 仅 HTML，完成度极低
- **LuminDev** — Python 但无实质内容

---

## 五、空位分析

### 5.1 最拥挤的方向
**Agentic DeFi** — 至少 8 个项目在做 yield/portfolio/trading，差异化困难

### 5.2 看起来很多人做但大多很虚的方向
**x402** — 7 个项目，但多数只是"x402 调用包装"，没有真正的支付创新
**RWA/Compliance** — 7 个项目，但多数停留在概念层面

### 5.3 项目少但官方评分会喜欢的方向
**⚠️ MCP Server / AI Toolkit 集成** — 几乎没有项目做！
- 官方明确鼓励使用 MCP Server、CSPR.click AI Agent Skill
- Casper 提供了完整的 AI Toolkit 但没人用
- **这是最大的空位！**

**DAO 多 Agent 协作** — 只有 2-3 个项目，但官方示例明确提到

### 5.4 4 天内可做出可验证 demo 的方向
- MCP Server 包装现有 Casper API → 最轻
- x402 微支付 agent → 中等
- 简单 DeFi action agent → 中等

### 5.5 最容易做出真实 Casper testnet tx 的方向
- 使用 CSPR.click 或 CSPR.cloud API 发起标准转账/合约调用
- MCP Server 可以直接调用这些 API

### 5.6 最容易让评委相信有 long-term launch potential 的方向
- 有清晰的产品故事 + 社交媒体 + 后续路线图
- MCP Server 可以被其他开发者复用

### 5.7 最容易拿 cash prize 的方向
- **Working Smart Contracts on Casper Testnet**（第一权重）
- **Use of AI / Agentic Systems**（第二权重）
- **Technical Execution**（第三权重）
- → 最佳组合：MCP Server + 真实 testnet tx + 清晰 agent workflow

---

## 六、技术栈统计

| 技术栈 | 项目数 |
|--------|--------|
| TypeScript | 18 |
| Rust | 5 |
| Python | 2 |
| Go | 1 |
| C# | 1 |
| WebAssembly | 1 |
| HTML only | 2 |
| None/Unknown | 3 |

TypeScript 是绝对主流。Rust 有 Odra 框架优势。

---

## 七、关键发现

1. **MCP 是最大空位**：官方明确推 MCP Server，但 32 个项目中几乎没人做
2. **DeFi 最拥挤**：8+ 项目在做，差异化困难
3. **多数项目完成度低**：32 个项目中 HIGH 完成度仅 5 个
4. **x402 是热门标签但创新少**：多数只是 API 包装
5. **启动时间很重要**：06-01 到 06-10 启动的项目明显更有优势
6. **我们还有 4 天**：如果方向正确、执行高效，完全可以追赶

---

## 八、对已有计划的评估

### 已有首选方向：Casper Agentic Yield Router

**问题：**
1. DeFi 方向已高度拥挤（8+ 项目）
2. ParkFlow-Agent 和 casper-ai-portfolio-agent 都在做类似的事
3. Casper testnet 上没有真实的 DeFi 协议/收益率数据
4. "Yield Router" 在 testnet 上没有真实的 yield 来源

**结论：Yield Router 不再是最优选择。应转向 MCP Server + Agent 方向。**
