import {memo} from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const NasdaqIconComponent = (props: SvgProps) => (
  <Svg width={106} height={30} viewBox="0 0 106 30" fill="none" {...props}>
    <Path
      fill="#FFF"
      fillRule="evenodd"
      d="M78.128 22.826c-3.617 0-5.864-2.101-5.864-5.485 0-3.516 2.073-5.701 5.412-5.701l.282-.002c.418 0 .994.013 1.782.114V7.509h2.362v14.935s-2.243.382-3.974.382Zm-.02-9.323c-2.286 0-3.397 1.236-3.397 3.78 0 2.281 1.34 3.699 3.495 3.699.414 0 .888-.026 1.534-.083v-7.245a10.365 10.365 0 0 0-1.632-.151ZM45.81 22.485l-6.373-11.153-.002 11.153h-2.221V8.368h3.108l6.375 11.053-.003-11.053h2.25v14.117H45.81ZM66.111 22.701c-1.073 0-2.192-.12-3.525-.377l-.142-.028v-1.972l.211.046c1.174.25 2.188.467 3.201.467.821 0 2.73-.131 2.73-1.34 0-1.014-1.32-1.268-2.38-1.471l-.066-.014a11.516 11.516 0 0 1-.543-.116c-1.554-.404-3.211-1.011-3.211-3.1 0-2.035 1.608-3.203 4.411-3.203 1.346 0 2.323.145 3.107.262l.384.058v1.911l-.205-.035c-.888-.164-1.929-.332-2.932-.332-1.111 0-2.435.208-2.435 1.202 0 .823 1.082 1.059 2.335 1.332 1.75.382 3.923.857 3.923 3.252 0 2.198-1.773 3.458-4.863 3.458ZM88.726 22.701c-2.445 0-4.706-.43-4.706-3.556 0-3.402 3.498-3.402 5.588-3.402.209 0 1.191.045 1.494.058-.003-1.908-.029-2.363-2.789-2.363-1.094 0-2.31.218-3.383.41l-.205.037v-1.886l.14-.028a18.074 18.074 0 0 1 3.664-.378c2.676 0 4.943.27 4.943 3.597v7.258l-.163.016a39.202 39.202 0 0 1-4.583.237Zm.823-5.276c-2.016 0-3.264.297-3.264 1.777 0 1.713 1.594 1.856 3.088 1.856.56 0 1.563-.071 1.87-.094v-3.48c-.433-.017-1.558-.059-1.694-.059ZM55.618 22.701c-2.445 0-4.706-.43-4.706-3.556 0-3.402 3.498-3.402 5.588-3.402.209 0 1.191.045 1.494.058-.003-1.908-.028-2.363-2.789-2.363-1.094 0-2.31.218-3.383.41l-.205.037v-1.886l.14-.028a18.077 18.077 0 0 1 3.664-.378c2.676 0 4.943.27 4.943 3.597v7.258l-.163.016a39.2 39.2 0 0 1-4.583.237Zm.823-5.276c-2.016 0-3.264.297-3.264 1.777 0 1.713 1.594 1.856 3.088 1.856.56 0 1.563-.071 1.87-.094v-3.48c-.433-.017-1.558-.059-1.694-.059ZM102.868 27.28v-4.63c-.922.13-1.412.13-1.807.13-.934 0-1.972-.204-2.777-.546-1.797-.748-2.87-2.653-2.87-5.097 0-1.221.296-3.45 2.28-4.653.993-.596 2.17-.85 3.936-.85.634 0 1.488.048 2.313.096l1.34.07v14.408l-2.415 1.072Zm-1.415-13.783c-2.396 0-3.612 1.225-3.612 3.64 0 3.108 1.815 3.76 3.338 3.76.37 0 .788 0 1.711-.117v-7.216a20.142 20.142 0 0 0-1.437-.067Z"
      clipRule="evenodd"
    />
    <Path
      fill="#0090BA"
      fillRule="evenodd"
      d="m26.673 0-7.805 21.496c-.192.53-.676.918-1.256.976v.013h8.25c.647 0 1.2-.412 1.407-.989L35.074 0h-8.401ZM16.94 22.157c.476 0 .896-.237 1.153-.598.027-.037.12-.17.186-.35l2.863-7.886-1.674-4.607a1.417 1.417 0 0 0-2.46-.273 1.568 1.568 0 0 0-.186.35l-2.862 7.884 1.681 4.624c.218.503.717.856 1.299.856ZM9.212 7.516h8.34v.005a1.495 1.495 0 0 0-1.345.983L8.402 30H0L7.805 8.504c.208-.576.76-.988 1.407-.988Z"
      clipRule="evenodd"
    />
  </Svg>
);

const NasdaqIcon = memo(NasdaqIconComponent);
export default NasdaqIcon;
