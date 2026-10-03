# 开发工具使用记录 · 商汤小浣熊（Raccoon Work）

> **负责人：Ella**
> **为什么记**：HacKU 2026 的 *Raccoon Work Technical Sponsor Award* 要求在提交表里写一段说明，讲清楚**怎么用的**。
> **每用一次追加一行。** 事后补不出来 —— 截图尤其补不出来。

---

## 记录格式

```
## YYYY-MM-DD HH:MM ｜ 用途：<研究 / 数据分析 / 内容撰写 / 编码辅助>
- 输入：
- 小浣熊输出：（摘要 + 截图文件名）
- 我们怎么验证：
- 结论：✅ 采纳 ／ ⚠️ 部分采纳 ／ ❌ 拒绝
- 截图：`raccoon-shots/0X-<名字>.png`
```

---

## 记录

<!-- TODO(Ella): 从这里往下追加。目标 ≥5 条，其中 ≥1 条 ❌ 拒绝。 -->

## 2026-10-03 __:__ ｜ 用途：___（示例行，替换掉）
- 输入：
- 小浣熊输出：
- 我们怎么验证：
- 结论：
- 截图：

---

## ⭐ 目标：至少一条「验证并拒绝」

评分标准里 **30% 是 *validation of AI-generated outputs*** —— **光写"我们验证了"没有用，要有一个具体事件。**

### 最省事的剧本（推荐）

```
1. 让小浣熊把药品名标准化成通用名        → 截图它的输出
2. 拿去我们自己的规则库里查              → 查不到，截图
3. 记录：我们改用「自己的归一化方式」
4. 结论：❌ 拒绝
```

**这是全场投入产出比最高的 20 分钟** —— 因为它不是额外工作，而是**我们本来就该做的验证，只是顺手截了图**。

### 提交表里那段话（可填空，供提交时改写）

```markdown
## Use of SenseTime Raccoon Work

We used Raccoon Work as a working tool during development — for research
lookup, data preparation, documentation, and coding assistance. It is a
development aid, not a runtime dependency of our product: our system is
designed to work offline, so nothing in the delivered prototype calls
Raccoon.

Three concrete uses:
1. <用途一>
2. <用途二>
3. <用途三>

We treated Raccoon's output as input to be verified, not as a conclusion to
be shipped. One example: we asked it to normalise a <drug name> to its
generic form; the output did not match our rule lookup, so we did not adopt
it and used <our own normalisation> instead. Screenshots of the request, the
output, the failed lookup, and our substitute are in `raccoon-shots/`.

This is consistent with our project's position: an AI tool for medication
safety should say "I cannot verify this" rather than guess.
```

---

## 完成检查

- [ ] 记录 **≥ 5 条**
- [ ] 其中 **≥ 1 条是 ❌ 拒绝**，且带 **3 张截图**（输出 / 查不到 / 我们的替代方案）
- [ ] 所有截图已放进 `raccoon-shots/`，命名与记录对应
- [ ] 提交表里的说明已写好，且引用的事件与截图对得上
