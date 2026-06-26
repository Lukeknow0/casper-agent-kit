# Casper Agentic Buildathon 2026 — 拿奖导向执行计划

> 目标：**一定要拿到奖金**  
> 核心策略：优先拿 **$30,000 Cash**，同时尽量兼容 **x402 Ecosystem Credits ($100,000)** 与 **In-kind Rewards ($20,000)**，不把“生态积分”当唯一收益。

---

## 1. 结论先行（给接手 AI 的判断）

- **值得做，但必须做成“可验证的链上 Agent 产品原型”，而不是 PPT 项目。**
- 当前页面公开信息显示：
  - 当前 buidls: **63**
  - 当前 registered hackers: **382**
  - 唯一 track: **Casper Innovation Track**
  - 资格轮截止: **2026-06-30**
  - 提交硬性要求: **可运行原型 + GitHub 仓库 + Demo 视频**
- **评委更像“生态投资型评委”**，会更偏爱：
  1. 真正 on Casper Testnet 可跑
  2. 有真实 transaction
  3. 有清晰 agent workflow
  4. 有后续 launch plan / social / ecosystem fit

---

## 2. 赛制结构（必须按这个打）

### 2.1 两阶段结构
- **Qualification Round**
  - 社区投票路径：Top 3 community-voted projects 可直接进 Final
  - Builder Merit Path：其余项目必须满足技术资格
- **Final Round**
  - 专业评审打分

### 2.2 结论
- 不建议把主策略押在“社区投票拿 Top 3”
- 主策略应押在 **“技术资格稳定通过 + Final 高评分”**
- 社区投票仅作加分项

---

## 3. 奖金结构（对齐你“拿到奖金”的目标）

页面明确奖池：

| 类别 | 金额 |
|------|------|
| Total Prize Pool | $150,000 USD |
| Cash Prizes | **$30,000 USD** |
| x402 Ecosystem Credits | $100,000 USD |
| In-kind Rewards from Co-Sponsors | $20,000 USD |

### 3.1 对你的意义
- **Cash 才是真奖金**
- x402 credits / in-kind rewards 更偏“后续生态价值”
- 所以选题必须能同时满足：
  - 评委主观打分高
  - 技术硬门槛满足
  - 容易展示真实交易、真实流程、真实 agent 行为

---

## 4. 评审口径（我从官方 criteria 提取的“可打分项”）

### 4.1 官方 Final Round criteria
1. Technical Execution  
2. Innovation & Originality  
3. Use of AI / Agentic Systems  
4. Real-World Applicability  
5. UX & Design  
6. Working Smart Contracts  
7. Long-Term Launch Plans  
8. Potential for Long-Term Impact

### 4.2 实战权重（我给接手 AI 的建议）
如果目标是“拿现金奖”，优先级建议如下：

1. **Working Smart Contracts on Casper Testnet**
2. **Use of AI / Agentic Systems**
3. **Technical Execution**
4. **Real-World Applicability（偏 DeFi/RWA）**
5. **Demo 清晰度 / UX**
6. **Long-Term Launch Plans**
7. Innovation
8. Long-Term Impact

即：  
**“能在 Testnet 上真实跑起来的 Agent + 真交易 + 清楚流程”**  
比  
**“概念很新但落地虚”**  
更值钱。

---

## 5. 当前 buidl 生态现状（我看到的公开页数据）

### 5.1 可确认公开事实
- buidlsCount: **63**
- applicationsCount: **80**
- hackersCount: **382**
- track: **Casper Innovation Track**
- submission requirements:
  - working prototype on Casper Testnet
  - transaction-producing on-chain component
  - open-source repo
  - demo video

### 5.2 页面强调的方向（可作方向雷达）
官方明显鼓励：
- Agentic AI
- DeFi
- RWA
- MCP Servers
- x402
- CSPR.click / CSPR.cloud
- Odra Framework
- autonomous agents
- on-chain identity / compliance / governance

---

## 6. 为什么我建议你做“窄而硬”的方向

当前这个 buildathon 不像纯 AI demo 赛，它更像：

**Casper 生态增长赛 + AI 包装**

所以评委心里的标准更接近：

- 你有没有帮我把开发者带进 Casper？
- 你有没有做出 Casper 上真实可演示的东西？
- 你有没有可能继续在 Casper 生态里活下来？

因此，**最差的打法**是：
- 纯前端 demo
- 只讲 LLM
- 没有链上 tx
- 依赖大量模拟

**最好的打法**是：
- 小但完整
- 有真实 on-chain tx
- 有真实 agent loop
- 有清晰产品故事
- 有可继续 launch 的形态

---

## 7. 我推荐的 3 个拿奖候选方向

---

### A. **Casper Agentic Yield Router（推荐首选）**

#### 一句话
一个可演示的 autonomous agent，监控 DeFi yield，自动在 Casper testnet 上执行 rebalance / action。

#### 为什么这个容易拿分
- 直接命中：**Agentic AI + DeFi**
- 评委最容易理解
- 容易展示：
  - agent 感知
  - decision
  - tx
  - 结果
- 比 RWA/合规更轻，比 DAO 治理更好 demo

#### 必须交付
1. testnet deployed contract/component
2. agent workflow loop
3. 至少一笔真实 testnet tx
4. repo
5. demo video

#### 差异化点
- 最好不是“模拟器”
- 最好做到：
  - agent reads on-chain state
  - agent makes decision
  - agent sends tx
  - tx explorer 可查

---

### B. **RWA Oracle / Data Agent with On-chain Identity**

#### 一句话
做链下数据上链的 agentic oracle，强调 verifiable identity / reputation。

#### 优点
- 很贴官方示例
- 高级感强
- RWA 是他们喜欢的叙事

#### 缺点
- 比 yield agent 更容易做得“虚”
- 需要更强证据链

#### 适合前提
- 你能做真实 data -> model -> on-chain write
- 能解释 trust-minimized story

---

### C. **AI Compliance / KYC Workflow for DeFi**

#### 一句话
off-chain compliance workflow，on-chain status/proof。

#### 优点
- 官方示例直接提到
- narrative 安全

#### 缺点
- 不好在短期 demo 中显得“真”
- 容易像流程图项目

#### 除非你能做到：
- 真有验证流程
- 真写链上状态
- 真有 demo 用户路径

否则不建议作为首选。

---

## 8. 最小可执行 MVP（4 天版）

如果你目标是 **6/30 前必须提交**，我建议直接做 MVP：

### MVP 名称建议
**Casper Agentic Action Agent (Testnet Yield/Action Router)**

### 核心模块
1. **Monitor Layer**
   - 读取 Casper testnet 状态/条件
2. **Decision Layer**
   - 简单 rule-based / LLM-assisted decision
3. **Execution Layer**
   - 发起真实链上 tx
4. **Frontend**
   - 简洁 dashboard
5. **Repo**
   - README + architecture + setup
6. **Video**
   - 2-3 分钟 demo

### MVP 成功标准
- 至少 1 个可重复执行的 agent action
- 至少 1 笔真实链上 tx
- 视频能证明“不是假跑”

---

## 9. 给接手 AI 的具体执行清单

---

### Phase 0：资格确认（Day 0）
- [ ] 确认 Casper Testnet 当前可用工具
- [ ] 确认你可用的技术栈（Odra / JS-SDK / TS-SDK / Python SDK）
- [ ] 确认你是否能快速发起 testnet tx
- [ ] 确认钱包、水龙头、explorer 都打通

---

### Phase 1：选题定型（Day 0-1）
建议直接锁定：

> “Agentic AI + DeFi action on Casper Testnet”

理由：
- 与官方评分标准强对齐
- demo 理解成本最低
- 最容易证明 on-chain 事实

---

### Phase 2：原型搭建（Day 1-2）
必须完成：
- [ ] 至少一个链上 component/contract
- [ ] 至少一个 agent workflow
- [ ] 至少一笔成功 testnet tx
- [ ] 基础 repo structure

---

### Phase 3：演示化（Day 2-3）
必须完成：
- [ ] 前端或 CLI 可演示流程
- [ ] clear input -> decision -> tx -> result
- [ ] explorer proof
- [ ] README 写清楚 how it works

---

### Phase 4：提交材料（Day 3-4）
必须完成：
- [ ] public repo
- [ ] demo video
- [ ] testnet contract address
- [ ] technology stack 清单
- [ ] 预填写 DoraHacks submission fields

---

## 10. Submission 需要准备的字段（基于页面公开信息）

页面显示提交表单至少含：

### 10.1 Casper Testnet Contract Address(es)
- 至少 1 个
- 最好真实可查

### 10.2 Technology Stack Used（多选）
选项包括：
- Odra Framework
- Native Casper Rust SDK
- CSPR.click
- CSPR.cloud
- JavaScript/TypeScript SDK
- Python SDK
- x402 Facilitator
- Casper MCP Server
- CSPR.trade MCP Server
- CSPR.click AI Agent Skill
- CSPR.cloud AI Agent Skill

### 10.3 建议勾选策略
- **尽量多选真正使用的官方生态组件**
- 因为这会强化“你不是外挂项目，而是生态项目”的印象
- 但不要乱选，避免答辩穿帮

---

## 11. 接手 AI 的打分优化策略（实操）

### 11.1 优先做给评审看的 5 个证据
1. **真实 testnet contract address**
2. **真实 tx hash**
3. **清晰 agent loop 图**
4. **2-3 分钟 demo video**
5. **README 中的 architecture + flow**

### 11.2 video 里必须讲清楚
- 你要解决什么问题
- agent 如何感知
- agent 如何决策
- agent 如何执行 on-chain
- 为什么这个对 Casper 生态有价值
- 未来怎么继续做

---

## 12. 我对你这个 case 的最终建议

### 如果你真的只追求“拿奖金”
**做窄、做硬、做可证明。**

首选方向就是：

## **Casper Agentic Action Agent (DeFi/Testnet Execution Agent)**

因为它是：
- 最好 demo
- 最好理解
- 最好证明 on-chain
- 最好对齐评审标准
- 最不容易显得虚

---

## 13. 我推荐给接手 AI 的 48 小时极简版本（如果你时间很紧）

### 项目名
**Casper Agentic Action Agent**

### 核心叙事
> An autonomous agent that monitors conditions on Casper Testnet and executes on-chain actions when thresholds are met.

### 你需要展示
1. Read state
2. Decide action
3. Execute transaction
4. Show explorer result

### 交付物
- contract/testnet component
- agent runner
- frontend or CLI
- repo
- video

---

## 14. 风险提示

### 14.1 时间风险
- 今天已是 6/26，距 deadline 很近
- 不要选太大方向

### 14.2 技术风险
- 最大风险不是前端，而是：
  - testnet tx 打通
  - contract/component 部署
  - agent 调用链稳定

### 14.3 评审风险
- 最怕“看起来像 fake demo”
- 因此必须留链上证据

---

## 15. 给别的 AI 的一句话执行原则

> 以“可验证链上事实”为中心构建 MVP，不要以“创意叙事”为中心。

---

## 16. 附：当前抓取到的公开事实（便于后续 AI 交叉校验）

- hackathon title: Casper Agentic Buildathon 2026 - Qualification Round
- buidlsCount: 63
- applicationsCount: 80
- hackersCount: 382
- track: Casper Innovation Track
- submission requirements: working prototype on Casper Testnet + transaction-producing on-chain component + open-source repo + demo video
- prize pool: $150,000 total; $30,000 cash; $100,000 x402 ecosystem credits; $20,000 in-kind
- ecosystem tags visible on page: Casper Network, x402, AI
- submission form question mentions testnet contract address + tech stack selection

---

## 17. 结论

如果你目标是“拿奖金”：

### 最优策略
**做 Casper Testnet 上真实可跑的 Agentic Execution Agent，围绕 DeFi action 展示完整 agent loop，并用链上 tx 证明。**

这是当前信息下最稳的拿奖路径。
