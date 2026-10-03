# MedSafe · 香港用药信息核对

**先认清手上是什么药，再看有出处的警示，把没解决的问题带给药师。** 面向香港长者及照护者的 HacKU 2026 原型：支持药盒拍照、人工确认药品、成分查询、多药逐对核对、粤语问答和药师问题卡。

> 当前为研究与展示原型，14 条规则全部待专业复核。产品目录完整导入不等于临床知识完整；未命中规则永远不表示安全。不会依据药盒生成个人剂量，也不会建议自行停用处方药。

- **团队仓库**：[yc-eagle/med-safe](https://github.com/yc-eagle/med-safe)
- **手机公开入口**：[MedSafe](https://med-safe-hacku-2026.stashes-primers-4n.chatgpt.site) — 已公开，可直接转发给队友；手机离线升级已公开发布。
- **所有数据与规则**：[可视清单](app/data-report.html) · [机器可读清单](data/data_inventory.json) · [数据解释](docs/data-inventory.md)
- **如何判断**：[算法与证据边界](docs/decision-logic.md) · [14 条规则](docs/rules/README.md)
- **在线演示材料**：[三分钟录屏与下载页](https://med-safe-hacku-2026.stashes-primers-4n.chatgpt.site/demo.html)
- **仓库内材料**：[180 秒录屏](assets/demo-3min.mp4) · [8 页可编辑幻灯片](deck/Med-Safe-HacKU2026.pptx) · [PDF](deck/Med-Safe-HacKU2026.pdf)
- **队友试用**：[五分钟反馈步骤](docs/tryout.md) · [详细操作](docs/try-it.md)

## 先用起来

### 手机或电脑网页

直接打开公开入口，不需要 GitHub 帐号。搜索完整 HK 注册号／产品名称 → 核对药盒并确认 → 选择实际给药途径 → 加入第二款或更多药品 → 查看逐对结果及出处。照片只是辅助找候选，不能替用户确认身份。可以只查一款药的资料，无须凑两款。

手机离线升级已通过 16 项核心工程检查（47 个缓存资源，约 52.6 MiB；含断网重开、查询、规则、OCR 和断网语音禁用），已发布至同一网址。正式发布状态以页面离线下载入口为准；尚未完成真实手机测试。浏览器语音可能由其服务商联网处理，使用前会说明并征得本次同意；不能把网页粤语识别说成全离线。离线时可手动输入。系统有本地粤语声音时才使用该声音朗读。

### 普通电脑，无模型也能离线查

1. 在 GitHub 点 **Code → Download ZIP**，解压。
2. 打开 `app/index.html`：已下载的目录、资料、规则核对和问题卡可本地使用。
3. 需要浏览器识字等完整网页功能时，在项目目录运行：

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory app
```

再打开 `http://127.0.0.1:8080`。识字资源随包提供，原图由浏览器处理；首次加载较大资源可能较慢。相机权限取决于浏览器和安全上下文。`file://` 备用模式不承诺相机或识字可用。外部原文链接断网时不能访问，本地摘要、日期与章节仍可查看。

### Apple Silicon Mac：本地拍照识字与粤语识别

准备 Python 3；双击 `启动演示.command`，或运行 `python3 server.py`，打开 `http://127.0.0.1:8765`。服务器仅监听本机，不是供队友手机远程连接的地址。若缺少编译后的识字组件，程序会尝试用已安装的 `swiftc` 编译 `native/ocr.swift`；没有开发工具时仍可手动查询。

需要本地粤语语音输入时，首次联网运行：

```sh
python3 tools/install_voice.py
python3 server.py
```

安装器仅支持 Apple Silicon macOS，为语音建立独立 `.voice-runtime`，安装锁定依赖，并下载约 0.7 GB 的固定版本 Qwen3-ASR 模型至相邻 `HacKU-Sunsy-VoiceModel/model`。首次安装不是离线操作；环境与模型齐备后可断网使用。没有云端 API Key。Windows／手机端没有随包提供这个 MLX 粤语模型。完整步骤见 [离线与资源](docs/offline.md)。

## 当前数据做到哪里

目录快照日期 **2026-09-25**；整理检查日期 **2026-10-03**。

| 层次 | 实际范围 | 不能由此推断 |
|---|---:|---|
| 香港注册药品 | 14,269 产品、14,269 唯一注册号 | 不是所有香港在用药品／完整批准说明书 |
| 原始成分记录 | 23,835 条、2,081 个不同成分字符串 | 字符串不等于标准化活性实体 |
| 已准备成分别名 | 1,431 产品至少含一种可映射成分；674 产品全部成分可映射 | 映射齐全不等于相互作用覆盖齐全 |
| 成分教育资料 | 14 个成分，13 条来源记录 | 不是个体剂量或所有不良反应 |
| 规则 | 14 条有来源的规则草案；**0 条专业批准** | 不是全面相互作用数据库 |
| 演示制剂 | 13 款，包括复方 | 不是全目录都经实物核对 |
| 词库 | 22 条 | 不保证口语／噪声环境药名识别准确率 |
| 多药核对 | 最多 12 款，66 对逐对记录 | 不评估三药以上高阶相互作用或累积剂量 |

全部细节在 [data/data_inventory.json](data/data_inventory.json)；原始目录、清洗 JSON／CSV／SQLite、规则、出处、日期、缺失字段、未使用数据源均可查。**没有声称“最全”**：约 1.018 亿种目录产品两两组合，不可能由 14 条规则得到全面保障。

## 判断过程与模型分工

1. 药名／照片／语音只帮助输入；OCR 与转写可能有错，必须人工核对。
2. 用完整 HK 注册号和目录定位产品；品牌、模糊名称只给候选。
3. 展开复方所有成分，只使用列明的同义词映射；未映射成分保留为缺口。
4. 为每一对产品记录匹配结果；同时检查实际途径是否在规则范围内。
5. 分别显示重复成分、说明书禁忌、建议避免、风险增加及先咨询，保留原文证据强度。
6. 有命中也继续显示未核对部分。无命中、途径不明、身份未确认均不能输出“安全”。

医学判断是可查看的确定性规则。**Qwen3-ASR 只负责粤语转写，Tesseract／Apple Vision 只负责识字；没有通用生成模型替用户开药。** 问答用带来源的资料与受控措辞。完整过程见 [docs/decision-logic.md](docs/decision-logic.md)。

## 易用性与隐私

繁体中文／English、大字模式、相机重拍与文件选择、识别后可纠错、明确缺口、药师问题卡、本人处方与包装用法不一致时的核实提示，均围绕减少误读和误操作。拒绝相机／麦克风权限仍可打字使用。照片或录音不是必须条件。

浏览器版照片在本机识字；Mac 版照片／录音仅送到同一台电脑的本地服务，临时文件随请求删除。浏览器语音可能发送录音给浏览器服务商，必须另作说明。详见 [数据流向](docs/data-handling.md)。工程可用性测试不等于真实长者研究，真实观察还未完成。

## 目录与协作

```text
app/                  浏览器产品、识字资源、AI 字段核验页
native/               macOS Vision / 本地语音工作进程
server.py             仅本机服务
 data/                当前完整清单、成分资料、患者措辞、词库
 data-pack/data/      注册目录、规则、别名、SQLite、来源元数据
 data-pack/raw/       获授权开放目录 XML / XSD
 docs/                场景、判断、数据处理、验证与提交说明
 docs/rules/review.csv 医学复核表，批准栏不能自动填写
 tests/、qa/           工程检查与结果，不冒充真人临床验证
```

修改规则时同时更新依据、适用途径、证据层级、日期和专业复核表，再运行 `python3 tools/build_data.py`。当前事实以 README、`docs/`、`data/data_inventory.json` 和实际程序为准。更早交接材料不作为当前完成状态。

核心规则测试可运行 `node tests/engine.test.cjs`、`node tests/patient.test.cjs`、`node tests/validator.test.cjs` 和 `node tests/product-features.test.cjs`。浏览器及本地接口测试需要其相应运行环境；详见 [技术验证](TECHNICAL_REPORT.md)。

## 提交与证据

公开站点已上线；手机离线升级已上线；最终提交表仍按 [提交清单](docs/submission.md) 的实际状态更新。官方手册核实的截止时间为 **2026-10-04 13:00 HKT**；团队按更严格的准备目标同时提供公开仓库、在线演示、3 分钟视频和幻灯片。不要将“文件已备妥”写成“已提交”。

Ella 提供了豆包与小浣熊分享链接，当前自动工具未能取到对话正文；它们只计为收到链接，不能当医学批准或已完成 AI 输出验证。记录见 [Raccoon 日志](docs/raccoon-usage-log.md)。

## 团队与展示协作

Ella 负责专业资料、规则复核与真实小浣熊留证；sunsy 负责产品与技术实现；YC 负责产品叙事、仓库协作与展示。新增代码位于 `app/`、`native/`、`server.py`，不在规划中的 `src/`。

沿用团队“读清楚／发现有依据的警示／承认未覆盖”的展示结构，避免把所有风险都说成绝对不能同服。团队现有 [竞品讨论](docs/competitors.md) 与 [路演规划](deck/pitch-deck.md) 保留作为待核实的展示素材；其中尚未取证的概括或未更新的功能描述，应按当前实现和来源修正后再讲。原始冲突文档完整保存在 [历史计划](docs/team-planning/README.md)。

## Credits / rights

香港政府开放目录、临床资料链接和开源组件分别署名，见 [CREDITS.md](CREDITS.md)。完整临床网页／美国标签下载快照、比赛兑换码、私人手册、真实患者影像与模型权重不随公开仓库上传。公开仓库不等同已选择开源许可证；原创代码授权待团队选择，未另授许可的权利保留。第三方许可保持原样。

## English overview

MedSafe is a Hong Kong medication-information prototype for older adults and caregivers. Confirm the exact product, inspect sourced warnings, and bring unresolved questions to a pharmacist. It includes a 14,269-product registration catalogue, 14 educational ingredient profiles, 14 **unreviewed** rule drafts and up to 12 selected products / 66 pair records.

OCR and Cantonese ASR assist input only. Explicit ingredient aliases and route-limited deterministic rules produce traceable warnings. A missing match never establishes safety; dose, patient-specific contraindications and higher-order interactions are not assessed. The catalogue is not a complete clinical interaction database.

Download the repository ZIP and open `app/index.html` for the offline manual workflow. Serve `app/` locally for browser OCR. The Apple Silicon build adds local Vision OCR and optional Qwen3-ASR after a first-time online installation. Web speech recognition may use the browser provider's servers and is disclosed separately. Public/mobile offline release status is tracked in the linked usage and submission documents.
