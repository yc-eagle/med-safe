# 下载与离线模式

[中文](offline.md) | [English](offline.en.md)

| 模式 | 已实现能力 | 条件 |
|---|---|---|
| 下载 ZIP 打开 `app/index.html` | 目录、成分资料、规则核对、手动问答与药师问题卡 | 先下载完整包；`file://` 的相机／识字受到限制 |
| 普通电脑本机静态服务 | 上述功能及浏览器 Tesseract 识字 | Python 3；运行 README 的 8080 命令；资源随包 |
| Apple Silicon Mac 本机服务 | Apple Vision 识字、可选 Qwen3-ASR 粤语识别、系统朗读 | Python、已编译 OCR／开发工具、预装语音环境与模型 |
| 手机安装式离线网页 | 16 项核心工程检查通过，已发布到公开站点 | 47 个资源约 52.6 MiB；下载完后可断网重开、查询、规则及 OCR；真实手机尚未测试，待队友真机反馈 |

## Mac 粤语安装

首次联网运行 `python3 tools/install_voice.py`。依赖精确版本在 `tools/asr-requirements.lock.txt`；模型为 `mlx-community/Qwen3-ASR-0.6B-4bit`，revision `313d850181767edf09f00a9c289becca70e58cd0`，权重约 0.7 GB，不在仓库内。安装器建立项目内 `.voice-runtime` 与相邻 `HacKU-Sunsy-VoiceModel/model`。

启动 `python3 server.py`，访问 `http://127.0.0.1:8765`。项目可通过 `ASR_PYTHON` 和 `ASR_MODEL` 环境变量指定本机路径，`.env.example` 仅提供示例且不会自动加载。模型未装好时仍能打字。服务器不监听局域网，不能把此地址发给队友手机。

断网前实际确认目录可查、选定药品可核对、图片可读、模型可转写、系统有粤语声。断网后原文网页不可打开；本地保留的是摘要与出处元数据。服务可能保留模型在内存以减少重复加载时间，关闭服务后释放。

## 手机语音与离线的区别

浏览器 SpeechRecognition 可能使用服务商网络，没有办法仅凭“浏览器 API”承诺离线。网页明确说明后才启动；断网应使用打字。本地朗读只选择浏览器报告 `localService=true` 的声音，粤语是否可用取决于装置预装声音。

手机离线缓存也可能被操作系统清理。首次下载、缓存完成提示、飞行模式重开、相机 OCR、缺失资源失败提示均须验证后再对外声明。个人药品选择、问句、音频与图像不应加入应用缓存。
