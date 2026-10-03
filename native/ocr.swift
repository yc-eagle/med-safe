import Foundation
import Vision
import ImageIO

func emit(_ value: Any) {
    if let data = try? JSONSerialization.data(withJSONObject: value, options: [.sortedKeys]),
       let text = String(data:data,encoding:.utf8) { print(text) }
}
guard CommandLine.arguments.count == 2 else { emit(["error":"Missing image"]); exit(2) }
let url = URL(fileURLWithPath:CommandLine.arguments[1])
guard let source = CGImageSourceCreateWithURL(url as CFURL,nil),
      let image = CGImageSourceCreateImageAtIndex(source,0,nil),
      image.width * image.height <= 50_000_000 else {
    emit(["error":"Invalid or oversized image"]); exit(2)
}
let properties = CGImageSourceCopyPropertiesAtIndex(source,0,nil) as? [CFString: Any]
let orientation = CGImagePropertyOrientation(rawValue:(properties?[kCGImagePropertyOrientation] as? UInt32) ?? 1) ?? .up
let request = VNRecognizeTextRequest()
request.recognitionLevel = .accurate
request.recognitionLanguages = ["zh-Hant","zh-Hans","en-US"]
request.usesLanguageCorrection = false
let start=Date()
do {
    try VNImageRequestHandler(cgImage:image,orientation:orientation,options:[:]).perform([request])
    let rows=(request.results ?? []).compactMap { item -> [String:Any]? in
        guard let candidate=item.topCandidates(1).first else { return nil }
        return ["text":candidate.string,"confidence":candidate.confidence]
    }
    emit(["rows":rows,"duration_seconds":Date().timeIntervalSince(start)])
} catch { emit(["error":"Text recognition failed"]); exit(2) }
