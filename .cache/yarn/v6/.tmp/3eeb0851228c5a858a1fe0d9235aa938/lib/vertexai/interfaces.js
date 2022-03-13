"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PipelineState;
(function (PipelineState) {
    PipelineState[PipelineState["PIPELINE_STATE_UNSPECIFIED"] = 0] = "PIPELINE_STATE_UNSPECIFIED";
    PipelineState[PipelineState["PIPELINE_STATE_QUEUED"] = 1] = "PIPELINE_STATE_QUEUED";
    PipelineState[PipelineState["PIPELINE_STATE_PENDING"] = 2] = "PIPELINE_STATE_PENDING";
    PipelineState[PipelineState["PIPELINE_STATE_RUNNING"] = 3] = "PIPELINE_STATE_RUNNING";
    PipelineState[PipelineState["PIPELINE_STATE_SUCCEEDED"] = 4] = "PIPELINE_STATE_SUCCEEDED";
    PipelineState[PipelineState["PIPELINE_STATE_FAILED"] = 5] = "PIPELINE_STATE_FAILED";
    PipelineState[PipelineState["PIPELINE_STATE_CANCELLING"] = 6] = "PIPELINE_STATE_CANCELLING";
    PipelineState[PipelineState["PIPELINE_STATE_CANCELLED"] = 7] = "PIPELINE_STATE_CANCELLED";
    PipelineState[PipelineState["PIPELINE_STATE_PAUSED"] = 8] = "PIPELINE_STATE_PAUSED";
})(PipelineState || (PipelineState = {}));
