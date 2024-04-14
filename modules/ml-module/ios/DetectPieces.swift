import AVFoundation
import Vision
import CoreImage


internal class DetectPieces{
    var detectionRequest:VNCoreMLRequest!
    var ready = false
    
    init(){
        Task { try self.initDetection() }
    }
    
    func initDetection()throws{
        do {
            
            guard let modelUrl = Bundle.main.url(forResource: "ChesspiecesModel", withExtension: "mlmodelc") else {
                throw DetectionError.FailedToLoadBoardSegModel
            }
            
            let configuration = MLModelConfiguration()
            
            let model = try MLModel(contentsOf: modelUrl, configuration: configuration)
        
            let VNmodel = try VNCoreMLModel(for: model)

            self.detectionRequest = VNCoreMLRequest(model: VNmodel)
            
            self.detectionRequest.imageCropAndScaleOption = .scaleFill
            
            self.ready = true
            
        } catch let error {
            NSLog("\(error)")
            throw DetectionError.FailedToLoadPiecesObjModel
        }
    }
    
    func detectAndProcess(image:CIImage)throws-> [ProcessedObservation]{
        
        let observations = try self.detect(image: image)
        
        let processedObservations = self.processObservation(observations: observations, viewSize: image.extent.size)
        
        return processedObservations
    }
    
    
    func detect(image:CIImage)throws-> [VNObservation]{
        
        let handler = VNImageRequestHandler(ciImage: image)
        
        do{
            try handler.perform([self.detectionRequest])
            let observations = self.detectionRequest.results!
            
            return observations
            
        }catch{
            throw DetectionError.FailedToDetectPieces
        }
        
    }
    
    
    func processObservation(observations:[VNObservation], viewSize:CGSize) -> [ProcessedObservation]{
       
        var processedObservations:[ProcessedObservation] = []
        
        for observation in observations where observation is VNRecognizedObjectObservation {
            
            let objectObservation = observation as! VNRecognizedObjectObservation
            
            let objectBounds = VNImageRectForNormalizedRect(objectObservation.boundingBox, Int(viewSize.width), Int(viewSize.height))
            
            let flippedBox = CGRect(x: objectBounds.minX, y: viewSize.height - objectBounds.maxY, width: objectBounds.maxX - objectBounds.minX, height: objectBounds.maxY - objectBounds.minY)
            
            let label = objectObservation.labels.first!.identifier
            
            let processedOD = ProcessedObservation(label: label, confidence: objectObservation.confidence, boundingBox: flippedBox)
            
            processedObservations.append(processedOD)
        }
        
        return processedObservations
        
    }

}

struct ProcessedObservation{
    var label: String
    var confidence: Float
    var boundingBox: CGRect
}
