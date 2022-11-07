// Imported React packages/modules
import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";

// Constants to use in Params
const logo = ({ height }) => (
<svg width="184" height="32" viewBox="0 0 205 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path clip-rule="evenodd" d="M119 0C119.552 0 120 0.447716 120 1V25C120 25.5523 119.552 26 119 26C118.448 26 118 25.5523 118 25V1C118 0.447715 118.448 0 119 0ZM71.0458 22.7346L68.2222 15.3632C68.0995 15.0844 67.8539 14.8986 67.547 14.8986H66.4114C66.1045 14.8986 65.8283 14.7128 65.7362 14.434L61.1325 2.47873H56.9277L52.4468 13.8765C52.2626 14.3721 52.6002 14.8986 53.122 14.8986C53.6438 14.8986 53.9814 15.4251 53.7972 15.9207L51.1271 22.7655H71.0458V22.7346ZM58.9227 6.10248L62.1146 14.403C62.2374 14.6818 62.4829 14.8676 62.7898 14.8676H63.9254C64.2323 14.8676 64.5086 15.0535 64.6006 15.3322L66.258 19.6373H55.9149L57.3574 15.8587C57.5416 15.3632 57.1733 14.8676 56.6822 14.8676H56.6208C56.0991 14.8676 55.7615 14.3411 55.9456 13.8765L58.9227 6.10248ZM106.402 19.6373V22.7346H91.1488V15.8278C91.1488 15.3012 90.7498 14.8986 90.2281 14.8986H89.9211C89.3994 14.8986 89.0004 14.496 89.0004 13.9694V2.47873H103.978V5.57596H92.4378V11.8014H102.228V14.8986H95.4763C94.9545 14.8986 94.5555 15.3012 94.5555 15.8278V19.6373H106.402ZM24.0264 15.8278V22.7346H20.6504V15.8278C20.6504 15.3012 20.2514 14.8986 19.7296 14.8986H19.4227C18.901 14.8986 18.502 14.496 18.502 13.9694V5.57596H12.7013V13.9694C12.7013 14.496 13.1003 14.8986 13.622 14.8986H13.9289C14.4507 14.8986 14.8497 15.3012 14.8497 15.8278V22.7346H11.4736V15.8278C11.4736 15.3012 11.0746 14.8986 10.5529 14.8986H10.2459C9.72419 14.8986 9.3252 14.496 9.3252 13.9694V5.57596H3.5245V13.9694C3.5245 14.496 3.92349 14.8986 4.44525 14.8986H4.75217C5.27392 14.8986 5.67291 15.3012 5.67291 15.8278V22.7346H2.29684V15.8278C2.29684 15.3012 1.89785 14.8986 1.3761 14.8986H1.06918C0.547427 14.8986 0.148438 14.496 0.148438 13.9694V2.47873H21.878V13.9694C21.878 14.496 22.277 14.8986 22.7988 14.8986H23.1057C23.6275 14.8986 24.0264 15.3012 24.0264 15.8278ZM49.1321 14.8986H48.4262C48.0886 14.8986 47.751 14.6818 47.5975 14.3721C47.4748 14.1553 47.352 13.9694 47.1985 13.7836C46.7075 13.319 45.9402 13.1022 44.8353 13.1022C45.8788 12.7305 46.7075 12.0801 47.2906 11.2129C47.8737 10.3457 48.1807 9.26165 48.1807 7.96082C48.1807 6.90776 47.9044 5.97859 47.352 5.14234C46.7995 4.3061 46.063 3.65568 45.1115 3.1911C44.1601 2.72651 43.1166 2.47873 41.9503 2.47873H32.927V13.9694C32.927 14.496 33.326 14.8986 33.8477 14.8986H34.1546C34.6764 14.8986 35.0754 15.3012 35.0754 15.8278V22.7346H38.5128V15.8278C38.5128 15.3012 38.9118 14.8986 39.4336 14.8986H44.6818C44.9581 14.8986 45.2036 14.9296 45.4184 14.9605C45.7867 15.0225 46.0323 15.1464 46.1857 15.3012C46.4619 15.549 46.5847 16.0755 46.5847 16.8498V22.7655H50.0222V15.9516V15.7658C50.0222 15.2703 49.6232 14.8986 49.1321 14.8986ZM44.3442 10.2837C44.068 10.7793 43.669 11.151 43.1166 11.4297C42.5641 11.7085 41.9196 11.8323 41.1216 11.8323H36.3951V5.57596H41.1216C42.3186 5.57596 43.2086 5.82373 43.8225 6.31929C44.4363 6.81484 44.7432 7.55818 44.7432 8.58026C44.7739 9.23068 44.6204 9.81915 44.3442 10.2837ZM31.3617 15.8278V22.7346H27.8936V15.8278C27.8936 15.3012 27.4946 14.8986 26.9728 14.8986H26.6659C26.1442 14.8986 25.7452 14.496 25.7452 13.9694V2.47873H29.1826V13.9694C29.1826 14.496 29.5816 14.8986 30.1034 14.8986H30.4103C30.932 14.8986 31.3617 15.3012 31.3617 15.8278ZM88.5707 15.8278V22.7346H85.5629V20.6285C85.2253 21.0311 84.7957 21.4337 84.2739 21.7744C83.7215 22.1461 83.0769 22.4248 82.3096 22.6726C81.5424 22.8894 80.683 23.0133 79.7315 23.0133C77.8287 23.0133 76.1713 22.5797 74.7288 21.6815C73.2863 20.7833 72.1507 19.5444 71.3835 17.9648C71.1113 17.443 70.8392 16.5316 70.6312 15.8351C70.6046 15.7461 70.5791 15.6607 70.5548 15.58C70.432 15.1773 70.0944 14.8986 69.6647 14.8986H69.0202C68.5598 14.8986 68.1608 14.5579 68.0995 14.0933C68.0381 13.6288 68.0381 13.1333 68.0381 12.6378V12.6376C68.0381 10.6554 68.4371 8.85901 69.235 7.27943C70.033 5.69984 71.1686 4.46096 72.6725 3.56276C74.1457 2.66457 75.8951 2.23096 77.8594 2.23096C79.5474 2.23096 80.9899 2.54068 82.2176 3.12915C83.4452 3.7486 84.3967 4.58485 85.1026 5.6379C85.7778 6.72193 86.1768 7.92984 86.2688 9.32359H82.8314C82.6779 8.08471 82.1869 7.09359 81.3582 6.38123C80.5295 5.66887 79.3939 5.29721 77.9821 5.29721H77.7059C76.4169 5.29721 75.312 5.57596 74.3912 6.16443C73.4705 6.7529 72.7339 7.58915 72.2428 8.70415C71.7517 9.81915 71.4755 11.12 71.4755 12.6066C71.4755 13.1332 71.5062 13.6287 71.5676 14.0933C71.629 14.5579 72.028 14.8986 72.4883 14.8986H73.1636C73.5625 14.8986 73.9309 15.1773 74.0536 15.549C74.1457 15.8897 74.2991 16.2923 74.3912 16.5091C74.8823 17.5932 75.6189 18.4604 76.5396 19.0489C77.4604 19.6373 78.596 19.9161 79.8543 19.9161H80.1305C81.082 19.9161 81.972 19.7303 82.7393 19.3896C83.5373 19.0179 84.1818 18.5533 84.6422 17.9029C85.1333 17.2215 85.3481 16.5401 85.4709 15.9826C85.5936 15.4251 85.1333 14.8676 84.5808 14.8676H77.8594V11.8014H83.9977C84.765 11.8014 85.3481 12.0491 85.8085 12.4518C86.2075 12.8235 86.3609 13.5048 86.4223 14.0933C86.453 14.5579 86.8827 14.9296 87.343 14.9296H87.6807C88.141 14.8986 88.5707 15.3012 88.5707 15.8278ZM168.104 17.7932C168.91 16.259 169.313 14.4161 169.313 12.2645C169.313 10.1128 168.91 8.27312 168.104 6.74549C167.304 5.21136 166.212 4.03801 164.828 3.22544C163.449 2.41288 161.886 2.00659 160.137 2.00659C158.389 2.00659 156.822 2.41288 155.438 3.22544C154.059 4.03801 152.967 5.21136 152.161 6.74549C151.362 8.27312 150.962 10.1128 150.962 12.2645C150.962 14.4096 151.362 16.2493 152.161 17.7834C152.967 19.3111 154.059 20.4844 155.438 21.3035C156.822 22.116 158.389 22.5223 160.137 22.5223C161.886 22.5223 163.449 22.116 164.828 21.3035C166.212 20.4909 167.304 19.3208 168.104 17.7932ZM164.964 8.43238C165.439 9.47247 165.676 10.7498 165.676 12.2645C165.676 13.7791 165.439 15.0597 164.964 16.1063C164.496 17.1464 163.846 17.9362 163.014 18.4757C162.182 19.0088 161.223 19.2753 160.137 19.2753C159.052 19.2753 158.093 19.0088 157.261 18.4757C156.429 17.9362 155.776 17.1464 155.301 16.1063C154.833 15.0597 154.599 13.7791 154.599 12.2645C154.599 10.7498 154.833 9.47247 155.301 8.43238C155.776 7.3858 156.429 6.59598 157.261 6.06294C158.093 5.52339 159.052 5.25362 160.137 5.25362C161.223 5.25362 162.182 5.52339 163.014 6.06294C163.846 6.59598 164.496 7.3858 164.964 8.43238ZM132.945 22.2493H139.712C141.741 22.2493 143.476 21.8495 144.919 21.05C146.369 20.2504 147.477 19.103 148.244 17.6079C149.018 16.1128 149.405 14.3251 149.405 12.245C149.405 10.1713 149.021 8.39013 148.254 6.90151C147.487 5.41288 146.388 4.27203 144.958 3.47897C143.535 2.6794 141.832 2.27962 139.849 2.27962H132.945V22.2493ZM139.537 19.1193H136.563V5.40963H139.644C140.996 5.40963 142.127 5.66315 143.037 6.1702C143.954 6.67074 144.646 7.42805 145.114 8.44213C145.582 9.44972 145.816 10.7173 145.816 12.245C145.816 13.7726 145.582 15.0467 145.114 16.0673C144.646 17.0814 143.947 17.8452 143.018 18.3587C142.088 18.8658 140.928 19.1193 139.537 19.1193ZM188.453 9.01743H184.807C184.703 8.41938 184.511 7.88959 184.231 7.42805C183.952 6.96001 183.604 6.56348 183.188 6.23845C182.772 5.91342 182.297 5.66965 181.764 5.50714C181.238 5.33812 180.669 5.25362 180.058 5.25362C178.972 5.25362 178.01 5.52664 177.172 6.07268C176.333 6.61223 175.677 7.4053 175.202 8.45189C174.727 9.49197 174.49 10.7628 174.49 12.2645C174.49 13.7921 174.727 15.0792 175.202 16.1258C175.683 17.1659 176.34 17.9524 177.172 18.4855C178.01 19.012 178.969 19.2753 180.048 19.2753C180.646 19.2753 181.205 19.1973 181.725 19.0413C182.252 18.8788 182.723 18.6415 183.139 18.3295C183.562 18.0174 183.916 17.6339 184.202 17.1789C184.495 16.7238 184.696 16.2038 184.807 15.6187L188.453 15.6382C188.317 16.5873 188.021 17.4779 187.566 18.31C187.117 19.142 186.529 19.8766 185.801 20.5137C185.073 21.1442 184.221 21.6383 183.246 21.9958C182.271 22.3468 181.189 22.5223 179.999 22.5223C178.244 22.5223 176.678 22.116 175.299 21.3035C173.921 20.4909 172.836 19.3176 172.043 17.7834C171.25 16.2493 170.853 14.4096 170.853 12.2645C170.853 10.1128 171.253 8.27312 172.052 6.74549C172.852 5.21136 173.941 4.03801 175.319 3.22544C176.697 2.41288 178.257 2.00659 179.999 2.00659C181.111 2.00659 182.145 2.16261 183.1 2.47463C184.056 2.78666 184.907 3.24495 185.655 3.8495C186.402 4.44755 187.017 5.18211 187.498 6.05318C187.985 6.91776 188.304 7.90584 188.453 9.01743ZM200.095 5.78016C200.771 6.2547 201.155 6.91776 201.246 7.76933H204.727C204.707 6.64473 204.392 5.65015 203.781 4.78558C203.17 3.9145 202.328 3.2352 201.256 2.74765C200.19 2.25361 198.948 2.00659 197.531 2.00659C196.133 2.00659 194.882 2.25361 193.777 2.74765C192.672 3.2352 191.797 3.921 191.154 4.80508C190.517 5.68915 190.198 6.71949 190.198 7.89609C190.198 9.32621 190.673 10.4736 191.622 11.3381C192.577 12.1962 193.878 12.8365 195.522 13.259L197.794 13.8441C198.509 14.0261 199.133 14.2341 199.666 14.4681C200.206 14.6957 200.625 14.9817 200.924 15.3262C201.223 15.6642 201.376 16.0933 201.382 16.6133C201.376 17.1854 201.204 17.6859 200.866 18.115C200.528 18.5375 200.06 18.869 199.462 19.1095C198.87 19.3436 198.181 19.4606 197.394 19.4606C196.64 19.4606 195.958 19.3468 195.347 19.1193C194.742 18.8918 194.251 18.5472 193.874 18.0857C193.497 17.6242 193.283 17.0456 193.231 16.3501H189.672C189.724 17.6762 190.068 18.8008 190.705 19.7238C191.349 20.6469 192.239 21.349 193.377 21.83C194.521 22.3111 195.87 22.5516 197.424 22.5516C199.023 22.5516 200.385 22.3046 201.509 21.8105C202.64 21.31 203.505 20.6177 204.103 19.7336C204.701 18.843 205 17.8127 205 16.6426C205 15.778 204.837 15.0239 204.512 14.3804C204.187 13.7368 203.745 13.1875 203.186 12.7325C202.634 12.2775 202.006 11.9004 201.304 11.6014C200.609 11.3024 199.884 11.0651 199.13 10.8896L197.258 10.4216C196.848 10.324 196.442 10.2038 196.039 10.0608C195.636 9.91776 195.269 9.74225 194.937 9.53423C194.606 9.31971 194.342 9.05969 194.147 8.75416C193.959 8.44864 193.865 8.08786 193.865 7.67182C193.871 7.17128 194.017 6.72599 194.303 6.33596C194.589 5.94592 195.002 5.63715 195.542 5.40963C196.081 5.18211 196.728 5.06835 197.482 5.06835C198.555 5.06835 199.426 5.30562 200.095 5.78016Z" fill="currentColor" fill-rule="evenodd"/>
</svg>
);

// Params
export default {
//General params
  project: {
    link: "https://github.com/mirage-xyz/",
  },
  titleSuffix: " – Mirage",
  toc: {
    float: true,
  },
  sidebar: { defaultMenuCollapsed: true },
// Feedback and Edit on GH links
  feedback: {
  labels: "feedback",
  content: "Give us feedback →",
  },
  docsRepositoryBase: "https://github.com/mirage-xyz/mirage-docs/blob/main",
  editLink: {
    text: "Edit this page on GitHub →",
  },
// Logo
  logo: logo,
// Head content and settings
  head() {
    const config = useConfig();
    const description =
      config.frontMatter.description ? config.frontMatter.description : "Mirage is the leading game services platform for Web3.";
    const image =
      config.frontMatter.image ||
      "https://mirage.xyz/static/logo.png";
    return (
      <>
         {/* General */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />

        {/* SEO */}
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
        <meta name="og:title" content={`${config.title} — Mirage`} />
        <meta name="apple-mobile-web-app-title" content={`${config.title} — Mirage`} />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site:domain" content="mirage.xyz" />
        <meta name="twitter:url" content="https://mirage.xyz" />
        <meta name="twitter:image" content={image} />
        <meta name="og:image" content={image} />

        {/* Favicons */}
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="apple-icon"
          sizes="180x180"
          href="/favicon/apple-icon-180x180.png"
        />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
      </>
    );
  },
//Footer content and settings
  footer: {
    text: <div>
        © {new Date().getFullYear()}  Mirage All rights reserved | <a href="https://mirage.xyz"><b>Back to mirage.xyz</b></a>
      </div>
  },
};