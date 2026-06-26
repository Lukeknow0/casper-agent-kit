# Casper Agentic Buildathon 2026 — 推荐方向

> 目标：最大化拿现金奖金概率
> 决策日期：2026-06-26
> 距截止：4 天（2026-06-30）

---

## 一、最终推荐

### 🏆 第一推荐：Casper MCP Agent Toolkit

**一句话定位：** 一个可复用的 MCP Server + Agent Skill 组合，让任何 AI Agent 都能自主查询 Casper 链上状态、发起交易、管理资产。

### 为什么做它

1. **最大空位**：32 个已知项目中，几乎没有 MCP Server 相关项目。官方明确将 MCP 列为 AI Toolkit 核心组件，但没人做。
2. **官方强对齐**：Technology Stack 表单中明确列出 "Casper MCP Server"、"CSPR.click AI Agent Skill"、"CSPR.cloud AI Agent Skill" 作为选项。
3. **差异化极强**：别人做 "用 AI 做 DeFi"，我们做 "让 AI 能力可复用"。
4. **评委理解成本低**：MCP 是 Anthropic 提出的标准，评委知道它是什么。
5. **有 long-term launch potential**：MCP Server 可以被整个 Casper 生态复用。
6. **技术风险可控**：本质是 API 包装 + 标准协议实现，不依赖复杂 DeFi 逻辑。
7. **真实链上交易**：通过 MCP Server 发起的交易天然可验证。

### 为什么不做其他方向

| 方向 | 不做的原因 |
|------|-----------|
| DeFi Yield Router | 8+ 竞品，testnet 无真实 yield，ParkFlow 和 portfolio-agent 都在做 |
| RWA Oracle | 容易做得虚，链下数据验证链难 4 天搞定 |
| DAO Governance | 需要多个 agent 协作，复杂度高 |
| Compliance/KYC | demo 不好看，像流程图 |
| x402 Protocol | 7 个竞品在做，多数只是 API 包装 |

---

## 二、具体方案

### 项目名
**CasperAgentKit — MCP-Powered Autonomous Agent Toolkit for Casper**

### Tagline
> "Give any AI agent the power to read, reason, and transact on Casper."

### 核心架构

```
┌─────────────────────────────────────────────┐
│              CasperAgentKit                  │
├─────────────────────────────────────────────┤
│  MCP Server Layer                           │
│  ├── casper-state-query    (读链上状态)      │
│  ├── casper-tx-builder     (构造交易)        │
│  ├── casper-account-info   (查询账户)        │
│  └── casper-contract-call  (调用合约)        │
├─────────────────────────────────────────────┤
│  Agent Skill Layer                          │
│  ├── CSPR.click integration                │
│  ├── CSPR.cloud API integration            │
│  └── Testnet faucet integration             │
├─────────────────────────────────────────────┤
│  Demo Agent                                 │
│  ├── Read chain state                       │
│  ├── Analyze with LLM                       │
│  ├── Decide action                          │
│  ├── Execute on-chain tx                    │
│  └── Verify result on explorer              │
├─────────────────────────────────────────────┤
│  Casper Testnet                             │
│  ├── Deployed contract (Odra)              │
│  └── Real transactions (verifiable)        │
└─────────────────────────────────────────────┘
```

### Agent Workflow

1. **感知** — Agent 通过 MCP Server 查询 Casper testnet 状态
2. **推理** — LLM 分析链上数据，做出决策
3. **执行** — 通过 MCP Server 发起链上交易
4. **验证** — 在 CSPR explorer 上验证交易结果
5. **记录** — Agent 将决策和结果记录为 on-chain receipt

---

## 三、4 天交付范围

### Day 1（6/26）：基础设施
- [ ] 设置 Casper testnet 开发环境
- [ ] 使用 Odra 部署一个简单的智能合约（存储/查询状态）
- [ ] 获取 testnet CSPR（faucet）
- [ ] 实现第一笔真实 testnet tx

### Day 2（6/27）：MCP Server
- [ ] 实现 MCP Server 核心（TypeScript）
- [ ] 暴露至少 4 个 tools：query_state, get_account, build_tx, send_tx
- [ ] 集成 CSPR.click / CSPR.cloud API
- [ ] 测试 MCP Server 可被 Claude/Cursor 调用

### Day 3（6/28）：Agent Demo
- [ ] 实现 Demo Agent（读取状态 → 分析 → 执行交易）
- [ ] 构建简单的前端 dashboard（或 CLI demo）
- [ ] 录制 demo 视频（2-3 分钟）
- [ ] 确保所有链上 tx 可在 explorer 验证

### Day 4（6/29）：提交材料
- [ ] 完善 README + architecture 文档
- [ ] GitHub repo 公开
- [ ] 录制最终 demo video
- [ ] 填写 DoraHacks 提交表单
- [ ] 预留 1 天 buffer

---

## 四、评分项对齐

| 官方评审项 | 本项目如何得分 |
|-----------|--------------|
| **Technical Execution** | MCP Server 标准实现 + Odra 合约 + 完整 API 集成 |
| **Innovation & Originality** | 首个 Casper MCP Agent Toolkit，填补生态空白 |
| **Use of AI / Agentic Systems** | Agent 通过 MCP 自主感知、决策、执行，完整的 agent loop |
| **Real-World Applicability** | MCP Server 可被任何 AI 应用复用，实用性强 |
| **UX & Design** | 清晰的 API 设计 + demo dashboard |
| **Working Smart Contracts** | Odra 部署的 testnet 合约，可验证 |
| **Long-Term Launch Plans** | MCP Server 可持续迭代，为整个 Casper 生态提供 agent 能力 |
| **Potential for Long-Term Impact** | 降低 AI agent 接入 Casper 的门槛，生态价值大 |

---

## 五、Demo 结构（2-3 分钟视频）

```
00:00 - 问题陈述：AI Agent 需要标准化方式接入 Casper
00:20 - 方案介绍：CasperAgentKit MCP Server
00:40 - 演示 1：Agent 通过 MCP 查询 testnet 状态
01:00 - 演示 2：Agent 分析数据并做出决策
01:20 - 演示 3：Agent 通过 MCP 发起链上交易
01:40 - 演示 4：在 CSPR explorer 上验证交易
02:00 - 架构图 + 技术栈说明
02:20 - Long-term vision + 生态价值
02:40 - 结束
```

---

## 六、提交文案草稿

### Title
CasperAgentKit — MCP-Powered Autonomous Agent Toolkit

### Tagline
Give any AI agent the power to read, reason, and transact on Casper.

### Description
CasperAgentKit is an open-source MCP (Model Context Protocol) Server that enables any AI agent to autonomously interact with the Casper Network. By implementing the MCP standard, we provide a plug-and-play solution for agents to query on-chain state, analyze data with LLMs, and execute transactions — all through a single, standardized interface.

### Problem
Building AI agents for blockchain requires deep integration work for each chain. Casper's AI Toolkit provides raw APIs, but there's no standardized, agent-friendly interface that works with the MCP ecosystem.

### Solution
CasperAgentKit bridges this gap by:
1. Implementing Casper blockchain operations as MCP tools
2. Integrating CSPR.click and CSPR.cloud APIs
3. Providing a demo agent that autonomously manages on-chain operations
4. Deploying real smart contracts on Casper Testnet via Odra

### Technical Architecture
- MCP Server (TypeScript) exposing Casper blockchain tools
- Smart contracts deployed via Odra Framework on Casper Testnet
- Integration with CSPR.click and CSPR.cloud APIs
- Demo agent using LLM for autonomous decision-making

### Technology Stack
- TypeScript (MCP Server)
- Odra Framework (Smart Contracts)
- CSPR.click (AI Agent Skill)
- CSPR.cloud (API Integration)
- Casper MCP Server
- Casper Testnet

### Long-Term Plan
- Expand MCP tools to cover full Casper API surface
- Add support for x402 micropayments
- Build agent marketplace on Casper
- Open-source community contributions

---

## 七、风险评估

| 风险 | 等级 | 缓解措施 |
|------|------|----------|
| MCP Server 技术实现 | 中 | MCP 是成熟协议，有 Node.js SDK |
| Casper testnet tx 成功 | 中 | 使用官方 Odra + CSPR.click，文档齐全 |
| 4 天时间不够 | 中 | MVP 只需 1 个合约 + 1 个 MCP tool + 1 笔 tx |
| 评委不理解 MCP | 低 | MCP 是 Anthropic 标准，知名度高 |
| DeFi 项目更有吸引力 | 中 | 我们的差异化是"生态基础设施"，不是又一个 DeFi bot |

---

## 八、Fallback 策略

如果 MCP Server 方向在 Day 1-2 遇到不可克服的技术障碍：

1. **Fallback A：Casper Agentic Action Agent**（降级到原计划的简化版）
   - 放弃 MCP，直接用 CSPR.click API 构建一个简单的 agent
   - 核心：read state → decide → execute tx
   - 牺牲差异化，但保证可交付

2. **Fallback B：Casper Chain Monitor + Alert Agent**
   - 更轻量：只做链上监控 + 自动告警
   - 不需要复杂 agent 逻辑
   - 可以 2 天内完成

3. **Fallback C：x402 Micro-Payment Demo**
   - 转向 x402 方向，做一个简单的 agent-to-agent 支付 demo
   - 虽然有竞品但可以做得更完整

**决策点：Day 2 晚上检查。如果 MCP Server 核心功能未完成，立即切换到 Fallback A。**

---

## 九、最终结论

**做 CasperAgentKit（MCP Agent Toolkit），不做 Yield Router。**

理由：
1. 最大空位，几乎没有竞品
2. 官方强对齐（Technology Stack 表单直接列了 MCP）
3. 技术风险可控，4 天可交付
4. Long-term launch potential 最强
5. 评委看到"生态基础设施"比看到"又一个 yield bot"更兴奋
