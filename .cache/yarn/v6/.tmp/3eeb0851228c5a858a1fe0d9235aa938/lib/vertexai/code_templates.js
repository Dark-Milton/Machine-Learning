"use strict";
/**
 * Code templates for endpoint code generation.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.tabularRegression = exports.tabularClassification = exports.textSentimentAnalysis = exports.textEntityExtraction = exports.textClassification = exports.imageObjectDetection = exports.imageClassification = void 0;
const imageClassification = (endpointDisplayName, projectId, endpointId, locationId) => `import base64

from google.cloud import aiplatform
from google.cloud.aiplatform.gapic.schema import predict


def predict_${endpointDisplayName}(  
    filename: str,
):
    project="${projectId}"
    endpoint_id="${endpointId}"
    location="${locationId}"
    api_endpoint="${locationId}-aiplatform.googleapis.com"
    client = aiplatform.gapic.PredictionServiceClient(client_options={"api_endpoint": api_endpoint}
    )
    with open(filename, "rb") as f:
        file_content = f.read()

    encoded_content = base64.b64encode(file_content).decode("utf-8")
    instance = predict.instance.ImageClassificationPredictionInstance(
    content=encoded_content,).to_value()
    instances = [instance]
    parameters = predict.params.ImageClassificationPredictionParams(confidence_threshold=0.5, max_predictions=5,).to_value()
    endpoint = client.endpoint_path(project=project, location=location, endpoint=endpoint_id)
    response = client.predict(endpoint=endpoint, instances=instances, parameters=parameters)
    print("response")
    print(" deployed_model_id:", response.deployed_model_id)
    predictions = response.predictions
    for prediction in predictions:
        print(" prediction:", dict(prediction))`;
exports.imageClassification = imageClassification;
const imageObjectDetection = (endpointDisplayName, projectId, endpointId, locationId) => `import base64

from google.cloud import aiplatform
from google.cloud.aiplatform.gapic.schema import predict


def predict_${endpointDisplayName}(
    filename: str,
):
    project="${projectId}"
    endpoint_id="${endpointId}"
    location="${locationId}"
    api_endpoint="${locationId}-aiplatform.googleapis.com"

    client_options = {"api_endpoint": api_endpoint}
    client = aiplatform.gapic.PredictionServiceClient(client_options=client_options)
    with open(filename, "rb") as f:
        file_content = f.read()

    instance = predict.instance.ImageObjectDetectionPredictionInstance(
        content=encoded_content,
    ).to_value()
    instances = [instance]
    parameters = predict.params.ImageObjectDetectionPredictionParams(
        confidence_threshold=0.5, max_predictions=5,
    ).to_value()
    endpoint = client.endpoint_path(
        project=project, location=location, endpoint=endpoint_id
    )
    response = client.predict(
        endpoint=endpoint, instances=instances, parameters=parameters
    )
    print("response")
    print(" deployed_model_id:", response.deployed_model_id)
    predictions = response.predictions
    for prediction in predictions:
        print(" prediction:", dict(prediction))`;
exports.imageObjectDetection = imageObjectDetection;
const textClassification = (endpointDisplayName, projectId, endpointId, locationId) => `def predict_${endpointDisplayName}(
    content
):
    project="${projectId}"
    endpoint_id="${endpointId}"
    location="${locationId}"
    aiplatform.init(project=project, location=location)
    endpoint = aiplatform.Endpoint(endpoint_id)
    response = endpoint.predict(instances=[{"content": content}], parameters={})
    for prediction_ in response.predictions:
        print(prediction_)`;
exports.textClassification = textClassification;
const textEntityExtraction = (endpointDisplayName, projectId, endpointId, locationId) => `def predict_${endpointDisplayName}(
    content
):
    project="${projectId}"
    endpoint_id="${endpointId}"
    location="${locationId}"

    aiplatform.init(project=project, location=location)
    endpoint = aiplatform.Endpoint(endpoint_id)
    response = endpoint.predict(instances=[{"content": content}], parameters={})
    for prediction_ in response.predictions:
        print(prediction_)`;
exports.textEntityExtraction = textEntityExtraction;
const textSentimentAnalysis = (endpointDisplayName, projectId, endpointId, locationId) => `def predict_${endpointDisplayName}(
    content
):
    project="${projectId}"
    endpoint_id="${endpointId}"
    location="${locationId}"

    aiplatform.init(project=project, location=location)
    endpoint = aiplatform.Endpoint(endpoint_id)
    response = endpoint.predict(instances=[{"content": content}], parameters={})
    for prediction_ in response.predictions:
        print(prediction_)`;
exports.textSentimentAnalysis = textSentimentAnalysis;
const tabularClassification = (endpointDisplayName, projectId, endpointId, locationId) => `from typing import Dict, List
  
def predict_${endpointDisplayName}(
    instances: List[Dict],
):
    project="${projectId}"
    endpoint="${endpointId}"
    location="${locationId}"
    aiplatform.init(project=project, location=location)
    endpoint = aiplatform.Endpoint(endpoint)
    response = endpoint.predict(instances=instances)
    for prediction_ in response.predictions:
        print(prediction_)`;
exports.tabularClassification = tabularClassification;
const tabularRegression = (endpointDisplayName, projectId, endpointId, locationId) => `from typing import Dict, List

def predict_${endpointDisplayName}(
    instances: List[Dict],
):
    project="${projectId}"
    endpoint="${endpointId}"
    location="${locationId}"
    
    aiplatform.init(project=project, location=location)
    endpoint = aiplatform.Endpoint(endpoint)
    response = endpoint.predict(instances=instances)
    for prediction_ in response.predictions:
        print(prediction_)`;
exports.tabularRegression = tabularRegression;
