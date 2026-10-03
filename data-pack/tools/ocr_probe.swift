import Foundation
import Vision
import AppKit

let path = CommandLine.arguments[1]
let request = VNRecognizeTextRequest()
request.recognitionLevel = .accurate
request.recognitionLanguages = ["zh-Hant", "zh-Hans", "en-US"]
request.usesLanguageCorrection = false
let start = Date()
try VNImageRequestHandler(url: URL(fileURLWithPath: path), options: [:]).perform([request])
let rows = (request.results ?? []).compactMap { observation -> [String: Any]? in
    guard let result = observation.topCandidates(1).first else { return nil }
    return ["text": result.string, "confidence": result.confidence]
}
let data = try JSONSerialization.data(withJSONObject: ["duration_seconds": Date().timeIntervalSince(start), "results": rows], options: [.prettyPrinted, .sortedKeys])
print(String(data: data, encoding: .utf8)!)
