"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkSelector = void 0;
const React = __importStar(require("react"));
const text_input_1 = require("../../components/shared/text_input");
const NETWORK_NAME_REGEX = /projects\/[a-z]([-a-z0-9]*[a-z0-9])?\/global\/networks\/[a-z]([-a-z0-9]*[a-z0-9])?/g;
const NETWORK_NAME_HELPER = 'projects/<project-id>/global/networks/<network-name>';
const HELPER_LINK = 'https://cloud.google.com/ai-platform/training/docs/vpc-peering#set-up-psa';
/** Component for providing a network. */
function NetworkSelector({ initialNetwork, onChange }) {
    const [network, setNetwork] = React.useState(initialNetwork || '');
    const [networkError, setNetworkError] = React.useState('');
    React.useEffect(() => {
        if (!network || network.match(NETWORK_NAME_REGEX)) {
            setNetworkError('');
            onChange(network);
        }
        else {
            setNetworkError(`Network must match the pattern ${NETWORK_NAME_HELPER}`);
        }
    }, [network]);
    return (React.createElement(text_input_1.TextInput, { label: "Network", name: "network", value: network, placeholder: NETWORK_NAME_HELPER, hasError: !!networkError, error: networkError, onChange: e => void setNetwork(e.target.value), formHelperText: 'Requires private services access for your VPC', formHelperLink: HELPER_LINK }));
}
exports.NetworkSelector = NetworkSelector;
