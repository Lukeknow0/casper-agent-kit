# Casper Agentic Buildathon 2026 — 4 天执行计划

> 项目：CasperAgentKit — MCP-Powered Autonomous Agent Toolkit
> 开始日期：2026-06-26
> 截止日期：2026-06-30
> 目标：提交一个可运行的 MCP Server + Demo Agent + 真实链上交易

---

## Day 1（6/26）— 基础设施搭建

### 必须完成
1. **Casper Testnet 环境**
   - 安装 Casper CLI 工具
   - 创建 testnet 钱包
   - 从 faucet 获取 testnet CSPR
   - 验证钱包余额和连接

2. **智能合约部署**
   - 安装 Odra Framework
   - 编写简单状态合约（set/get 值）
   - 部署到 Casper Testnet
   - 记录 contract address

3. **第一笔真实交易**
   - 调用合约的 set 方法
   - 在 CSPR explorer 上验证交易
   - 记录 tx hash

4. **项目骨架**
   - 创建 GitHub repo
   - 基础目录结构：
     ```
     casper-agent-kit/
     ├── mcp-server/          # MCP Server 实现
     ├── contracts/           # Odra 智能合约
     ├── demo-agent/          # Demo Agent
     ├── docs/                # 文档
     └── README.md
     ```

### 验收标准
- [ ] testnet 钱包有 CSPR 余额
- [ ] 合约已部署，contract address 可查
- [ ] 至少 1 笔真实 testnet tx 完成
- [ ] GitHub repo 已创建

### Fallback
- 如果 Odra 安装有问题 → 使用 Casper JS SDK 直接部署
- 如果 faucet 不可用 → 使用官方 Discord 请求 testnet token

---

## Day 2（6/27）— MCP Server 实现

### 必须完成
1. **MCP Server 核心**
   - 使用 `@modelcontextprotocol/sdk` (TypeScript)
   - 实现至少 4 个 tools：
     - `casper_query_state` — 查询合约状态
     - `casper_get_account` — 查询账户余额和信息
     - `casper_build_transaction` — 构造交易
     - `casper_send_transaction` — 发送交易

2. **API 集成**
   - 集成 CSPR.click API（查询区块/交易）
   - 集成 CSPR.cloud API（账户/合约信息）
   - 测试每个 tool 的独立功能

3. **MCP Server 测试**
   - 用 Claude Desktop 或 Cursor 测试 MCP Server
   - 验证 AI 可以通过 MCP 调用所有 tools
   - 记录测试过程截图

### 验收标准
- [ ] MCP Server 启动无错误
- [ ] 4 个 tools 全部可调用
- [ ] CSPR.click / CSPR.cloud API 集成成功
- [ ] Claude/Cursor 可以通过 MCP 调用 tools

### Fallback
- 如果 CSPR.click API 不可用 → 使用 CSPR.cloud
- 如果两者都不可用 → 直接调用 Casper JSON-RPC 节点

---

## Day 3（6/28）— Demo Agent + 前端

### 必须完成
1. **Demo Agent**
   - 实现完整 agent loop：
     - 读取链上状态（通过 MCP）
     - LLM 分析数据
     - 做出决策
     - 执行链上交易（通过 MCP）
     - 验证结果
   - Agent 可以是 CLI 或简单脚本

2. **前端 Dashboard（可选但加分）**
   - 简洁的 web UI 显示：
     - 链上状态
     - Agent 决策过程
     - 交易历史
     - Explorer 链接

3. **Demo 视频（初版）**
   - 录制 2-3 分钟演示视频
   - 包含：问题 → 方案 → 演示 → 架构 → 愿景

### 验收标准
- [ ] Agent 完整执行一轮 loop（读 → 想 → 做 → 验证）
- [ ] 至少 3 笔不同类型的 testnet tx
- [ ] Demo 视频初版完成
- [ ] 所有 tx 在 explorer 可查

### Fallback
- 如果前端来不及 → 用 CLI + terminal 录屏
- 如果 Agent 太复杂 → 简化为 "read → decide → execute" 三步

---

## Day 4（6/29）— 提交材料 + 收尾

### 必须完成
1. **GitHub Repo 完善**
   - README.md（architecture + setup + usage）
   - 所有代码可运行
   - License 文件

2. **Demo 视频（最终版）**
   - 上传到 YouTube（公开）
   - 确保画质和音质清晰

3. **DoraHacks 提交**
   - 项目标题
   - Tagline
   - Description
   - GitHub repo URL
   - Demo video URL
   - Testnet contract address
   - Technology stack（多选）
   - 回答所有提交问题

4. **最终检查**
   - 所有链接可访问
   - 所有 tx 可在 explorer 验证
   - README 清晰完整

### 验收标准
- [ ] DoraHacks 提交成功
- [ ] GitHub repo 公开可访问
- [ ] Demo video 公开可看
- [ ] Contract address 在 explorer 可查
- [ ] 至少 3 笔 tx 在 explorer 可查

### Fallback
- 如果视频质量不好 → 重新录制关键部分
- 如果提交表单有问题 → 留 2 小时 buffer 处理

---

## 技术栈清单

| 组件 | 技术 | 用途 |
|------|------|------|
| MCP Server | TypeScript + @modelcontextprotocol/sdk | 核心能力暴露 |
| 智能合约 | Odra Framework (Rust) | Testnet 合约部署 |
| API 集成 | CSPR.click + CSPR.cloud | 链上数据查询 |
| Demo Agent | TypeScript/Python + LLM | 自主演示 |
| 前端（可选） | HTML/CSS/JS | Dashboard |
| 视频 | 屏幕录制 | Demo 演示 |

---

## 提交表单预填

### Casper Testnet Contract Address(es)
`<待 Day 1 填写>`

### Technology Stack Used
- [x] Odra Framework
- [x] CSPR.click
- [x] CSPR.cloud
- [x] JavaScript/TypeScript SDK
- [x] Casper MCP Server
- [x] CSPR.click AI Agent Skill
- [x] CSPR.cloud AI Agent Skill

---

## 每日检查点

| 时间 | 检查项 | 如果卡住怎么办 |
|------|--------|---------------|
| Day 1 晚 | 合约部署 + 1 笔 tx | 切换到 JS SDK 直接部署 |
| Day 2 晚 | MCP Server 4 tools 可用 | 砍到 2 个核心 tools |
| Day 3 晚 | Agent 完整 demo + 视频初版 | 简化 agent 为 3 步 |
| Day 4 中午 | 提交材料准备完毕 | 砍掉前端，只提交 CLI demo |
| Day 4 晚 | DoraHacks 提交完成 | 确认提交状态 |
