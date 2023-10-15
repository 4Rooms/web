import React from "react";
import { ErrorProps, LogoProps } from "../App.types";

export const RowBelow = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="6"
        viewBox="0 0 8 6"
        fill="none"
    >
        <path
            d="M4.52049 5.27125C4.23995 5.57625 3.76005 5.57625 3.47951 5.27125L0.189492 1.69448C-0.229743 1.23871 0.0921481 0.5 0.709987 0.5L7.29001 0.500001C7.90785 0.500001 8.22974 1.23871 7.81051 1.69448L4.52049 5.27125Z"
            fill="#EAEAEA"
        />
    </svg>
);

export const Favorite = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="16"
        viewBox="0 0 18 16"
        fill="none"
    >
        <path
            d="M13.1233 0C12.2791 0.013284 11.4534 0.25169 10.7294 0.691141C10.0054 1.13059 9.40886 1.75553 9 2.50284C8.59114 1.75553 7.99461 1.13059 7.27063 0.691141C6.54665 0.25169 5.72086 0.013284 4.87666 0C3.53091 0.059151 2.263 0.654724 1.34992 1.6566C0.436849 2.65848 -0.047163 3.98522 0.00362936 5.34698C0.00362936 8.79559 3.59168 12.562 6.60097 15.1156C7.27286 15.6868 8.12237 16 9 16C9.87763 16 10.7271 15.6868 11.399 15.1156C14.4083 12.562 17.9964 8.79559 17.9964 5.34698C18.0472 3.98522 17.5632 2.65848 16.6501 1.6566C15.737 0.654724 14.4691 0.059151 13.1233 0ZM10.4357 13.9552C10.0338 14.2976 9.52535 14.4853 9 14.4853C8.47465 14.4853 7.96618 14.2976 7.56433 13.9552C3.71238 10.6856 1.50302 7.54872 1.50302 5.34698C1.45178 4.38734 1.77769 3.44613 2.40968 2.72863C3.04167 2.01112 3.92847 1.57554 4.87666 1.51687C5.82486 1.57554 6.71165 2.01112 7.34365 2.72863C7.97564 3.44613 8.30155 4.38734 8.2503 5.34698C8.2503 5.54813 8.32929 5.74104 8.46988 5.88327C8.61048 6.02551 8.80117 6.10542 9 6.10542C9.19883 6.10542 9.38952 6.02551 9.53012 5.88327C9.67071 5.74104 9.7497 5.54813 9.7497 5.34698C9.69845 4.38734 10.0244 3.44613 10.6564 2.72863C11.2883 2.01112 12.1751 1.57554 13.1233 1.51687C14.0715 1.57554 14.9583 2.01112 15.5903 2.72863C16.2223 3.44613 16.5482 4.38734 16.497 5.34698C16.497 7.54872 14.2876 10.6856 10.4357 13.9522V13.9552Z"
            fill="#212121"
        />
    </svg>
);

export const Saved = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
    >
        <path
            d="M13.9177 15.9977C13.6487 15.997 13.3825 15.9475 13.1344 15.8519C12.8864 15.7564 12.6615 15.6168 12.4727 15.4411L7.99999 11.3657L3.52732 15.4438C3.24007 15.7109 2.87168 15.8925 2.47018 15.9649C2.06868 16.0373 1.65269 15.9972 1.27644 15.8497C0.896454 15.7096 0.571389 15.4678 0.343692 15.1557C0.115994 14.8437 -0.00375214 14.476 8.96253e-05 14.1006V3.33285C8.96253e-05 2.44892 0.383201 1.6012 1.06514 0.976169C1.74709 0.351139 2.672 0 3.63641 0L12.3636 0C12.8411 0 13.314 0.0862067 13.7551 0.253698C14.1963 0.42119 14.5972 0.666686 14.9348 0.976169C15.2725 1.28565 15.5404 1.65306 15.7231 2.05742C15.9058 2.46178 15.9999 2.89517 15.9999 3.33285V14.1006C16.004 14.4757 15.8847 14.8432 15.6575 15.1552C15.4303 15.4672 15.1059 15.7092 14.7265 15.8497C14.4703 15.9479 14.1954 15.9982 13.9177 15.9977ZM3.63641 1.33314C3.05776 1.33314 2.50282 1.54382 2.09365 1.91884C1.68448 2.29386 1.45462 2.80249 1.45462 3.33285V14.1006C1.45436 14.2117 1.49001 14.3203 1.55709 14.4129C1.62417 14.5054 1.71965 14.5776 1.83148 14.6204C1.94331 14.6632 2.06647 14.6746 2.1854 14.6533C2.30434 14.632 2.4137 14.5788 2.4997 14.5006L7.49091 9.95389C7.62717 9.82974 7.8115 9.76006 8.00363 9.76006C8.19576 9.76006 8.38009 9.82974 8.51635 9.95389L13.5017 14.4992C13.5877 14.5775 13.6971 14.6306 13.816 14.652C13.935 14.6733 14.0581 14.6618 14.17 14.619C14.2818 14.5762 14.3773 14.504 14.4444 14.4115C14.5114 14.319 14.5471 14.2104 14.5468 14.0993V3.33285C14.5468 2.80249 14.317 2.29386 13.9078 1.91884C13.4986 1.54382 12.9437 1.33314 12.365 1.33314H3.63641Z"
            fill="#212121"
        />
    </svg>
);

export const Smile = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
    >
        <path
            d="M10 20C8.02219 20 6.08879 19.4135 4.4443 18.3147C2.79981 17.2159 1.51809 15.6541 0.761209 13.8268C0.00433286 11.9996 -0.1937 9.98891 0.192152 8.0491C0.578004 6.10929 1.53041 4.32746 2.92894 2.92894C4.32746 1.53041 6.10929 0.578004 8.0491 0.192152C9.98891 -0.1937 11.9996 0.00433286 13.8268 0.761209C15.6541 1.51809 17.2159 2.79981 18.3147 4.4443C19.4135 6.08879 20 8.02219 20 10C19.9971 12.6513 18.9426 15.1932 17.0679 17.0679C15.1932 18.9426 12.6513 19.9971 10 20ZM10 1.66667C8.35182 1.66667 6.74066 2.15541 5.37025 3.07109C3.99984 3.98677 2.93174 5.28826 2.30101 6.81097C1.67028 8.33369 1.50525 10.0092 1.82679 11.6258C2.14834 13.2423 2.94201 14.7271 4.10745 15.8926C5.27288 17.058 6.75774 17.8517 8.37425 18.1732C9.99076 18.4948 11.6663 18.3297 13.189 17.699C14.7117 17.0683 16.0132 16.0002 16.9289 14.6298C17.8446 13.2593 18.3333 11.6482 18.3333 10C18.3309 7.79061 17.4522 5.6724 15.8899 4.11013C14.3276 2.54785 12.2094 1.6691 10 1.66667ZM6.66667 11.6667C6.53662 11.6661 6.40823 11.696 6.29179 11.7539C6.17535 11.8118 6.07408 11.8962 5.99609 12.0002C5.91809 12.1043 5.86554 12.2252 5.84263 12.3532C5.81973 12.4812 5.8271 12.6128 5.86417 12.7375C6.16275 13.6104 6.7178 14.3729 7.45674 14.9252C8.19568 15.4776 9.08411 15.7941 10.0058 15.8333C10.928 15.797 11.8173 15.4815 12.5563 14.9287C13.2952 14.3759 13.8489 13.6118 14.1442 12.7375C14.1775 12.613 14.1822 12.4826 14.1577 12.356C14.1333 12.2295 14.0805 12.1102 14.0032 12.007C13.9259 11.9039 13.8262 11.8197 13.7116 11.7607C13.597 11.7018 13.4705 11.6696 13.3417 11.6667H6.66667ZM5 8.33334C5 9.16667 5.74584 9.16667 6.66667 9.16667C7.5875 9.16667 8.33334 9.16667 8.33334 8.33334C8.33334 7.89131 8.15774 7.46739 7.84518 7.15483C7.53262 6.84226 7.1087 6.66667 6.66667 6.66667C6.22464 6.66667 5.80072 6.84226 5.48816 7.15483C5.1756 7.46739 5 7.89131 5 8.33334ZM11.6667 8.33334C11.6667 9.16667 12.4125 9.16667 13.3333 9.16667C14.2542 9.16667 15 9.16667 15 8.33334C15 7.89131 14.8244 7.46739 14.5118 7.15483C14.1993 6.84226 13.7754 6.66667 13.3333 6.66667C12.8913 6.66667 12.4674 6.84226 12.1548 7.15483C11.8423 7.46739 11.6667 7.89131 11.6667 8.33334Z"
            fill="#212121"
        />
    </svg>
);

export const AddFile = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
    >
        <path
            d="M19.7452 8.26221C19.5831 8.10015 19.3633 8.00912 19.134 8.00912C18.9048 8.00912 18.685 8.10015 18.5229 8.26221L9.10774 17.718C8.7064 18.1194 8.22994 18.4378 7.70555 18.6551C7.18115 18.8723 6.6191 18.9841 6.05149 18.9842C4.90514 18.9843 3.80571 18.529 2.99506 17.7184C2.18441 16.9079 1.72895 15.8085 1.72887 14.6622C1.72878 13.5158 2.18409 12.4164 2.99463 11.6057L12.1133 2.44991C12.6009 1.97007 13.2584 1.70234 13.9425 1.70504C14.6266 1.70775 15.2819 1.98067 15.7657 2.46435C16.2495 2.94803 16.5226 3.60329 16.5254 4.28739C16.5283 4.9715 16.2607 5.62902 15.781 6.11674L6.66232 15.2726C6.49787 15.4301 6.27892 15.5181 6.05118 15.5181C5.82344 15.5181 5.6045 15.4301 5.44005 15.2726C5.27799 15.1105 5.18696 14.8906 5.18696 14.6614C5.18696 14.4322 5.27799 14.2124 5.44005 14.0503L13.5586 5.89458C13.7161 5.73155 13.8032 5.5132 13.8012 5.28656C13.7992 5.05991 13.7083 4.84311 13.5481 4.68284C13.3878 4.52257 13.171 4.43166 12.9443 4.42969C12.7177 4.42772 12.4993 4.51485 12.3363 4.67231L4.21777 12.828C3.97692 13.0688 3.78586 13.3547 3.65551 13.6694C3.52516 13.984 3.45807 14.3213 3.45807 14.6619C3.45807 15.0025 3.52516 15.3397 3.65551 15.6544C3.78586 15.969 3.97692 16.2549 4.21777 16.4957C4.71188 16.9672 5.36863 17.2303 6.05162 17.2303C6.7346 17.2303 7.39135 16.9672 7.88546 16.4957L17.0033 7.33901C17.7968 6.525 18.2377 5.43113 18.2304 4.29436C18.2231 3.15759 17.7682 2.06946 16.9644 1.26568C16.1605 0.461907 15.0723 0.00720766 13.9355 8.4952e-05C12.7987 -0.00703776 11.7049 0.43399 10.891 1.22763L1.77235 10.3835C0.637534 11.5183 -1.69101e-08 13.0574 0 14.6623C1.69101e-08 16.2672 0.637534 17.8063 1.77235 18.9411C2.90717 20.076 4.44631 20.7135 6.05118 20.7135C7.65606 20.7135 9.1952 20.076 10.33 18.9411L19.7452 9.48794C19.8259 9.40761 19.89 9.31211 19.9338 9.20694C19.9775 9.10176 20 8.98898 20 8.87507C20 8.76117 19.9775 8.64838 19.9338 8.54321C19.89 8.43803 19.8259 8.34253 19.7452 8.26221Z"
            fill="#212121"
        />
    </svg>
);

export const Logo: React.FC<LogoProps> = ({ className }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="32"
        viewBox="0 0 40 32"
        fill="none"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.3926 16.4026C20.3926 15.5337 21.0949 14.8293 21.9612 14.8293H38.4318C39.2981 14.8293 40.0004 15.5337 40.0004 16.4026V27.4156V31.2119C40.0004 31.8839 39.2146 32.2465 38.706 31.8091L35.4255 28.9889H21.9612C21.0949 28.9889 20.3926 28.2845 20.3926 27.4156V16.4026ZM21.9612 17.1892C21.9612 16.7547 22.312 16.4026 22.7455 16.4026H37.6475C38.081 16.4026 38.4318 16.7547 38.4318 17.1892V25.0557V26.629V29.7756L35.6867 27.4156H22.7455C22.312 27.4156 21.9612 27.0635 21.9612 26.629V17.1892ZM25.0985 21.9091C25.0985 22.3436 24.7477 22.6958 24.3141 22.6958C23.8806 22.6958 23.5298 22.3436 23.5298 21.9091C23.5298 21.4746 23.8806 21.1225 24.3141 21.1225C24.7477 21.1225 25.0985 21.4746 25.0985 21.9091ZM28.2357 22.6958C28.6692 22.6958 29.02 22.3436 29.02 21.9091C29.02 21.4746 28.6692 21.1225 28.2357 21.1225C27.8022 21.1225 27.4514 21.4746 27.4514 21.9091C27.4514 22.3436 27.8022 22.6958 28.2357 22.6958ZM32.9416 21.9091C32.9416 22.3436 32.5908 22.6958 32.1573 22.6958C31.7238 22.6958 31.373 22.3436 31.373 21.9091C31.373 21.4746 31.7238 21.1225 32.1573 21.1225C32.5908 21.1225 32.9416 21.4746 32.9416 21.9091ZM36.0789 22.6958C36.5124 22.6958 36.8632 22.3436 36.8632 21.9091C36.8632 21.4746 36.5124 21.1225 36.0789 21.1225C35.6453 21.1225 35.2945 21.4746 35.2945 21.9091C35.2945 22.3436 35.6453 22.6958 36.0789 22.6958Z"
            fill="#D06EFD"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 16.3903C0 15.5282 0.702359 14.8293 1.56863 14.8293H18.0392C18.9055 14.8293 19.6078 15.5282 19.6078 16.3903V21.5371L22.7731 24.0809C23.2051 24.588 22.8428 25.3659 22.1749 25.3659H19.6078V27.3171C19.6078 28.1792 18.9055 28.878 18.0392 28.878H1.56863C0.702359 28.878 0 28.1792 0 27.3171V16.3903ZM1.56863 17.1707C1.56863 16.7397 1.91942 16.3903 2.35294 16.3903H17.2549C17.6884 16.3903 18.0392 16.7397 18.0392 17.1707V21.4634L20.3922 24.1951H18.0392V26.5366C18.0392 26.9677 17.6884 27.3171 17.2549 27.3171H2.35294C1.91942 27.3171 1.56863 26.9677 1.56863 26.5366V17.1707Z"
            fill="#F5BB00"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 1.5733C0 0.704401 0.702359 0 1.56863 0H18.0392C18.9055 0 19.6078 0.704401 19.6078 1.5733V12.5864C19.6078 13.4553 18.9055 14.1597 18.0392 14.1597H11.6337L8.35325 16.9798C7.84467 17.4172 7.05882 17.0546 7.05882 16.3826V14.1597H1.56863C0.702359 14.1597 0 13.4553 0 12.5864V1.5733ZM1.56863 2.35994C1.56863 1.92547 1.91942 1.5733 2.35294 1.5733H17.2549C17.6884 1.5733 18.0392 1.92547 18.0392 2.35994V11.7997C18.0392 12.2342 17.6884 12.5864 17.2549 12.5864H11.3725L8.62745 14.9463V12.5864H2.35294C1.91942 12.5864 1.56863 12.2342 1.56863 11.7997V2.35994Z"
            fill="#61C9A8"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M39.9997 1.56097C39.9997 0.698885 39.2974 0 38.4311 0H21.9605C21.0942 0 20.3919 0.698885 20.3919 1.56097V6.70979L18.2266 9.25138C17.7946 9.75852 18.1569 10.5366 18.8248 10.5366H20.3919V12.4878C20.3919 13.3499 21.0942 14.0488 21.9605 14.0488H38.4311C39.2974 14.0488 39.9997 13.3499 39.9997 12.4878V1.56097ZM38.4311 2.34146C38.4311 1.91039 38.0803 1.56097 37.6468 1.56097H22.7448C22.3113 1.56097 21.9605 1.91039 21.9605 2.34146V6.63414L19.6076 9.36585H21.9605V11.7073C21.9605 12.1384 22.3113 12.4878 22.7448 12.4878H37.6468C38.0803 12.4878 38.4311 12.1384 38.4311 11.7073V2.34146Z"
            fill="#FF6666"
        />
    </svg>
);

export const Back = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
    >
        <path
            d="M22.535 7.46656C22.0715 7.00158 21.5205 6.63312 20.9137 6.38252C20.3069 6.13191 19.6565 6.00412 19 6.00656H2.79997L7.09997 1.70656C7.28721 1.51852 7.39209 1.2638 7.39152 0.998437C7.39096 0.733073 7.285 0.478801 7.09697 0.291558C6.90893 0.104315 6.65421 -0.000560355 6.38884 2.25194e-06C6.12348 0.000564859 5.86921 0.10652 5.68197 0.294558L0.731966 5.24356C0.263288 5.71238 0 6.34815 0 7.01106C0 7.67397 0.263288 8.30974 0.731966 8.77856L5.68197 13.7296C5.77481 13.8227 5.88508 13.8966 6.00649 13.9471C6.1279 13.9976 6.25806 14.0236 6.38955 14.0238C6.52104 14.024 6.65128 13.9983 6.77283 13.9481C6.89438 13.898 7.00486 13.8244 7.09797 13.7316C7.19107 13.6387 7.26498 13.5284 7.31547 13.407C7.36596 13.2856 7.39204 13.1555 7.39223 13.024C7.39242 12.8925 7.3667 12.7622 7.31655 12.6407C7.26641 12.5191 7.19281 12.4087 7.09997 12.3156L2.78797 8.00656H19C19.7956 8.00656 20.5587 8.32263 21.1213 8.88524C21.6839 9.44785 22 10.2109 22 11.0066V18.0066C22 18.8022 21.6839 19.5653 21.1213 20.1279C20.5587 20.6905 19.7956 21.0066 19 21.0066H4.99997C4.73475 21.0066 4.4804 21.1119 4.29286 21.2994C4.10532 21.487 3.99997 21.7413 3.99997 22.0066C3.99997 22.2718 4.10532 22.5261 4.29286 22.7137C4.4804 22.9012 4.73475 23.0066 4.99997 23.0066H19C20.3256 23.005 21.5964 22.4777 22.5337 21.5403C23.4711 20.603 23.9984 19.3322 24 18.0066V11.0066C24.0022 10.3489 23.8738 9.69736 23.6224 9.08969C23.3709 8.48202 23.0013 7.93031 22.535 7.46656Z"
            fill="#212121"
        />
    </svg>
);

export const Google = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
    >
        <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
        />
        <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
        />
        <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
        />
        <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
        />
        <path d="M1 1h22v22H1z" fill="none" />
    </svg>
);

export const Error: React.FC<ErrorProps> = ({ className }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="3"
        height="21"
        viewBox="0 0 3 21"
        fill="none"
    >
        <path
            d="M1.5 14.7857C1.10218 14.7857 0.720645 14.6352 0.439341 14.3673C0.158036 14.0994 8.13303e-07 13.736 8.13303e-07 13.3571V1.92857C8.13303e-07 1.54969 0.158036 1.18633 0.439341 0.918419C0.720645 0.65051 1.10218 0.5 1.5 0.5C1.89783 0.5 2.27936 0.65051 2.56066 0.918419C2.84196 1.18633 3 1.54969 3 1.92857V13.3571C3 13.736 2.84196 14.0994 2.56066 14.3673C2.27936 14.6352 1.89783 14.7857 1.5 14.7857ZM1.5 17.6429C1.20333 17.6429 0.913318 17.7266 0.666645 17.8836C0.419971 18.0406 0.227713 18.2637 0.114181 18.5247C0.000649921 18.7858 -0.0290551 19.073 0.0288228 19.3501C0.0867006 19.6272 0.229562 19.8818 0.439341 20.0816C0.64912 20.2814 0.916394 20.4174 1.20737 20.4725C1.49834 20.5277 1.79994 20.4994 2.07403 20.3913C2.34812 20.2831 2.58238 20.1 2.7472 19.8651C2.91203 19.6302 3 19.354 3 19.0714C3 18.6925 2.84196 18.3292 2.56066 18.0613C2.27936 17.7934 1.89783 17.6429 1.5 17.6429Z"
            fill="#D83434"
        />
    </svg>
);

export const IconOkey: React.FC<ErrorProps> = ({ className }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="9"
        viewBox="0 0 13 9"
        fill="none"
    >
        <path
            d="M10.747 0.403587L5.23795 6.18407L2.28611 2.96351C2.16765 2.828 2.02446 2.71866 1.86499 2.64194C1.70551 2.56521 1.53298 2.52266 1.35754 2.51678C1.1821 2.5109 1.00732 2.54182 0.843477 2.60771C0.679637 2.6736 0.530058 2.77313 0.403552 2.90044C0.277045 3.02775 0.17617 3.18026 0.106869 3.34899C0.0375674 3.51772 0.00124135 3.69925 3.12628e-05 3.88289C-0.00117882 4.06654 0.0327516 4.24858 0.0998228 4.41829C0.166894 4.588 0.26575 4.74195 0.390567 4.87107L3.42396 8.1742C3.65019 8.42986 3.92362 8.63485 4.22772 8.77678C4.53182 8.91872 4.86028 8.99465 5.19323 8.99999H5.23664C5.56294 9.00111 5.8862 8.93441 6.18766 8.80376C6.48913 8.67311 6.76278 8.4811 6.99274 8.23889L12.6123 2.35932C12.735 2.23117 12.8324 2.07899 12.899 1.91146C12.9655 1.74393 12.9998 1.56432 13 1.38291C13.0002 1.2015 12.9662 1.02182 12.9 0.854142C12.8338 0.686463 12.7367 0.534066 12.6143 0.405651C12.4918 0.277236 12.3463 0.175317 12.1862 0.105716C12.0261 0.0361144 11.8544 0.000192474 11.681 7.71354e-07C11.5077 -0.000190931 11.3359 0.0353517 11.1757 0.104599C11.0154 0.173846 10.8697 0.275443 10.747 0.403587Z"
            fill="#2CA129"
        />
    </svg>
);

export const HiddenPassword = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="10"
        viewBox="0 0 22 10"
        fill="none"
    >
        <path
            d="M21 1C19.8299 2.45982 17.8714 4.11149 15.7826 5.05M10.2833 5.95V10M10.2833 5.95C8.24792 5.95 6.55342 5.43978 5.16149 4.69801M10.2833 5.95C12.82 5.95 14.2158 5.75398 15.7826 5.05M1 1C1.8681 2.17926 3.22067 3.66373 5.16149 4.69801M5.16149 4.69801L2.73913 8.2M15.7826 5.05L17.9565 8.65"
            stroke="#212121"
        />
    </svg>
);

export const OpenPassword = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="11"
        viewBox="0 0 24 11"
        fill="none"
    >
        <path
            d="M15.5032 5.5C15.5032 7.58443 13.9062 9.27419 11.9363 9.27419C9.96637 9.27419 8.36943 7.58443 8.36943 5.5C8.36943 3.41557 9.96637 1.72581 11.9363 1.72581C13.9062 1.72581 15.5032 3.41557 15.5032 5.5Z"
            fill="#212121"
        />
        <path
            d="M22.3861 5.81767L22.6644 5.4794L22.3657 5.15902C21.2784 3.99287 20.1126 2.81558 18.4973 1.93952C16.8744 1.05928 14.8314 0.5 12 0.5C9.15939 0.5 7.02177 1.13585 5.35713 2.04959C3.69665 2.96105 2.53237 4.13531 1.62419 5.1702L1.35892 5.47249L1.59731 5.79639C3.34019 8.16435 6.3061 10.5 12 10.5C14.83 10.5 16.9353 9.94132 18.5891 9.0625C20.2409 8.18481 21.4092 7.00515 22.3861 5.81767Z"
            stroke="#212121"
        />
    </svg>
);

export const MyChats = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
    >
        <path
            d="M15 0H3C2.20435 0 1.44129 0.316075 0.87868 0.878692C0.316071 1.44131 0 2.20438 0 3.00004V12.0002C0 12.7958 0.316071 13.5589 0.87868 14.1215C1.44129 14.6841 2.20435 15.0002 3 15.0002H5.175L8.51325 17.8225C8.64867 17.9371 8.82034 18 8.99775 18C9.17516 18 9.34683 17.9371 9.48225 17.8225L12.825 15.0002H15C15.7956 15.0002 16.5587 14.6841 17.1213 14.1215C17.6839 13.5589 18 12.7958 18 12.0002V3.00004C18 2.20438 17.6839 1.44131 17.1213 0.878692C16.5587 0.316075 15.7956 0 15 0ZM16.5 12.0002C16.5 12.398 16.342 12.7795 16.0607 13.0608C15.7794 13.3422 15.3978 13.5002 15 13.5002H12.825C12.4705 13.5003 12.1274 13.626 11.8568 13.8549L9 16.2677L6.14475 13.8549C5.87367 13.6256 5.53005 13.4999 5.175 13.5002H3C2.60218 13.5002 2.22064 13.3422 1.93934 13.0608C1.65804 12.7795 1.5 12.398 1.5 12.0002V3.00004C1.5 2.60221 1.65804 2.22068 1.93934 1.93937C2.22064 1.65806 2.60218 1.50002 3 1.50002H15C15.3978 1.50002 15.7794 1.65806 16.0607 1.93937C16.342 2.22068 16.5 2.60221 16.5 3.00004V12.0002Z"
            fill="#212121"
        />
    </svg>
);

export const SavedChats = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
    >
        <path
            d="M15.6575 17.9974C15.3548 17.9966 15.0553 17.9409 14.7762 17.8334C14.4972 17.726 14.2442 17.5689 14.0318 17.3712L8.99999 12.7864L3.96823 17.3742C3.64508 17.6747 3.23064 17.879 2.77895 17.9605C2.32726 18.042 1.85927 17.9968 1.43599 17.8309C1.00851 17.6733 0.642812 17.4012 0.386653 17.0502C0.130494 16.6992 -0.00422116 16.2855 0.000100828 15.8632V3.74946C0.000100828 2.75504 0.431101 1.80135 1.19829 1.09819C1.96547 0.395031 3.006 0 4.09096 0L13.909 0C14.4462 0 14.9782 0.0969826 15.4745 0.28541C15.9709 0.473838 16.4218 0.750021 16.8017 1.09819C17.1816 1.44636 17.4829 1.8597 17.6885 2.3146C17.8941 2.76951 17.9999 3.25707 17.9999 3.74946V15.8632C18.0045 16.2851 17.8702 16.6986 17.6147 17.0496C17.3591 17.4006 16.9941 17.6728 16.5673 17.8309C16.2791 17.9414 15.9698 17.998 15.6575 17.9974ZM4.09096 1.49978C3.43998 1.49978 2.81567 1.7368 2.35536 2.1587C1.89504 2.58059 1.63644 3.15281 1.63644 3.74946V15.8632C1.63615 15.9882 1.67627 16.1104 1.75173 16.2145C1.82719 16.3185 1.9346 16.3998 2.06041 16.4479C2.18622 16.4961 2.32478 16.509 2.45858 16.485C2.59238 16.461 2.71542 16.4012 2.81216 16.3131L8.42727 11.1981C8.58057 11.0585 8.78793 10.9801 9.00408 10.9801C9.22023 10.9801 9.4276 11.0585 9.5809 11.1981L15.1895 16.3116C15.2862 16.3997 15.4092 16.4595 15.543 16.4835C15.6768 16.5075 15.8154 16.4946 15.9412 16.4464C16.067 16.3983 16.1744 16.317 16.2499 16.213C16.3254 16.1089 16.3655 15.9867 16.3652 15.8617V3.74946C16.3652 3.15281 16.1066 2.58059 15.6463 2.1587C15.186 1.7368 14.5616 1.49978 13.9107 1.49978H4.09096Z"
            fill="#212121"
        />
    </svg>
);

export const Notifications = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
    >
        <path
            d="M15.6642 11.4983L12.831 16.1145C12.5199 16.6245 12.0964 17.0569 11.5926 17.3788C11.0889 17.7008 10.5183 17.9037 9.92419 17.9722C9.76764 17.9908 9.61013 18.0001 9.45249 18C8.64538 17.9989 7.85835 17.7487 7.19913 17.2838C6.51791 17.7933 5.67641 18.0424 4.8271 17.9859C3.9778 17.9294 3.17686 17.5709 2.56942 16.9756C1.96198 16.3802 1.58821 15.5872 1.51583 14.7404C1.44346 13.8936 1.67727 13.0488 2.1749 12.3593L1.18718 11.3746C0.765419 10.9534 0.444556 10.4424 0.248616 9.87991C0.052676 9.31738 -0.0132627 8.71788 0.0557381 8.1263C0.124739 7.53472 0.326891 6.96639 0.647054 6.46389C0.967218 5.96138 1.3971 5.53771 1.90449 5.22461L6.2362 2.55013C7.4096 1.79922 8.78952 1.43515 10.1813 1.5093C11.573 1.58345 12.9063 2.09206 13.993 2.96338L15.2391 1.71914C15.3084 1.64751 15.3913 1.59037 15.4829 1.55106C15.5746 1.51176 15.6731 1.49107 15.7729 1.4902C15.8726 1.48934 15.9715 1.50831 16.0638 1.54602C16.1561 1.58373 16.24 1.63942 16.3105 1.70984C16.381 1.78026 16.4368 1.864 16.4746 1.95617C16.5123 2.04834 16.5313 2.1471 16.5305 2.24668C16.5296 2.34627 16.5089 2.44468 16.4695 2.53618C16.4301 2.62769 16.3729 2.71044 16.3012 2.77963L15.0566 4.02312C15.8913 5.06729 16.3951 6.33642 16.5033 7.66808C16.6116 8.99975 16.3194 10.3334 15.6642 11.4983ZM6.05442 16.2353L3.26101 13.4453C3.04272 13.8351 2.95853 14.2857 3.02135 14.7279C3.08417 15.17 3.29053 15.5794 3.60878 15.8933C3.92983 16.1978 4.33817 16.3944 4.77669 16.4558C5.21521 16.5171 5.66196 16.44 6.05442 16.2353ZM13.5063 4.53536C12.6722 3.6945 11.5742 3.16514 10.396 3.03586C9.21786 2.90657 8.03095 3.1852 7.03388 3.82512L2.69467 6.4996C2.37998 6.69382 2.11338 6.95662 1.91483 7.2683C1.71627 7.57999 1.59092 7.9325 1.54814 8.29942C1.50537 8.66634 1.54629 9.03817 1.66784 9.38706C1.78938 9.73595 1.98841 10.0529 2.25001 10.3141L7.72566 15.7823C7.98768 16.0442 8.30577 16.2434 8.65599 16.3649C9.00622 16.4863 9.37948 16.527 9.74769 16.4836C10.1159 16.4403 10.4695 16.3142 10.7818 16.1148C11.0942 15.9154 11.3572 15.6478 11.5511 15.3323L14.3716 10.7386C14.9224 9.75062 15.136 8.61036 14.9799 7.49041C14.8237 6.37046 14.3064 5.33178 13.5063 4.53161V4.53536ZM14.467 18C14.3083 18.0003 14.1537 17.9504 14.0252 17.8576C13.8967 17.7647 13.8009 17.6336 13.7516 17.483C13.7024 17.3325 13.7021 17.1702 13.7508 17.0195C13.7996 16.8688 13.8949 16.7373 14.023 16.644C15.3383 15.6567 16.2284 14.207 16.513 12.5888C16.533 12.4914 16.5721 12.3989 16.6282 12.3167C16.6843 12.2346 16.7562 12.1644 16.8397 12.1102C16.9232 12.056 17.0166 12.019 17.1146 12.0012C17.2126 11.9834 17.3131 11.9853 17.4104 12.0067C17.5076 12.028 17.5997 12.0685 17.6811 12.1257C17.7626 12.183 17.8318 12.2558 17.8848 12.34C17.9378 12.4241 17.9735 12.518 17.9898 12.6161C18.0062 12.7142 18.0028 12.8145 17.9799 12.9113C17.6119 14.885 16.5163 16.6493 14.9094 17.856C14.7809 17.9496 14.626 18 14.467 18ZM0.747771 4.30437C0.609041 4.30375 0.473193 4.26478 0.35529 4.19178C0.237386 4.11878 0.142033 4.0146 0.0798042 3.8908C0.0175752 3.76699 -0.00909859 3.6284 0.00274032 3.49038C0.0145792 3.35236 0.0644683 3.22031 0.146876 3.10888C1.37194 1.47433 3.17525 0.367892 5.18914 0.0151528C5.38436 -0.0246293 5.58742 0.0146545 5.75363 0.124362C5.91985 0.23407 6.03561 0.405215 6.07546 0.600148C6.1153 0.79508 6.07595 0.997832 5.96608 1.1638C5.85621 1.32977 5.68481 1.44536 5.48958 1.48514C3.8356 1.75785 2.35158 2.65935 1.34867 4.00062C1.2791 4.09446 1.18855 4.17078 1.08423 4.22351C0.979905 4.27624 0.864696 4.30393 0.747771 4.30437Z"
            fill="#212121"
        />
    </svg>
);

export const Messenger = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
    >
        <path
            d="M14.25 0H3.75C2.7558 0.00129916 1.80267 0.432722 1.09966 1.19963C0.396661 1.96655 0.00119089 3.00633 0 4.09091L0 13.9091C0.00119089 14.9937 0.396661 16.0335 1.09966 16.8004C1.80267 17.5673 2.7558 17.9987 3.75 18H14.25C15.2442 17.9987 16.1973 17.5673 16.9003 16.8004C17.6033 16.0335 17.9988 14.9937 18 13.9091V4.09091C17.9988 3.00633 17.6033 1.96655 16.9003 1.19963C16.1973 0.432722 15.2442 0.00129916 14.25 0ZM3.75 1.63636H14.25C14.6991 1.63733 15.1376 1.78488 15.5092 2.06002C15.8808 2.33517 16.1684 2.72532 16.335 3.18027L10.5915 9.44673C10.1688 9.90598 9.59656 10.1638 9 10.1638C8.40344 10.1638 7.83118 9.90598 7.4085 9.44673L1.665 3.18027C1.83161 2.72532 2.11921 2.33517 2.49079 2.06002C2.86236 1.78488 3.30091 1.63733 3.75 1.63636ZM14.25 16.3636H3.75C3.15326 16.3636 2.58097 16.105 2.15901 15.6447C1.73705 15.1844 1.5 14.5601 1.5 13.9091V5.31818L6.348 10.6036C7.05197 11.3697 8.00569 11.7998 9 11.7998C9.99431 11.7998 10.948 11.3697 11.652 10.6036L16.5 5.31818V13.9091C16.5 14.5601 16.2629 15.1844 15.841 15.6447C15.419 16.105 14.8467 16.3636 14.25 16.3636Z"
            fill="#212121"
        />
    </svg>
);

export const CloseModal = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
    >
        <path
            d="M1.62095 15.1032L0 13.5929L6.48381 7.55159L0 1.51032L1.62095 0L8.10476 6.04128L14.5886 0L16.2095 1.51032L9.72572 7.55159L16.2095 13.5929L14.5886 15.1032L8.10476 9.06191L1.62095 15.1032Z"
            fill="#212121"
        />
    </svg>
);

export const MoreInformation = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="6"
        viewBox="0 0 26 6"
        fill="none"
    >
        <path
            d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3Z"
            fill="#212121"
        />
        <path
            d="M16 3C16 4.65685 14.6569 6 13 6C11.3431 6 10 4.65685 10 3C10 1.34315 11.3431 0 13 0C14.6569 0 16 1.34315 16 3Z"
            fill="#212121"
        />
        <path
            d="M26 3C26 4.65685 24.6569 6 23 6C21.3431 6 20 4.65685 20 3C20 1.34315 21.3431 0 23 0C24.6569 0 26 1.34315 26 3Z"
            fill="#212121"
        />
    </svg>
);

export const SendMessage = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
    >
        <path
            d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z"
            fill="#212121"
        />
        <path
            d="M19.415 10.6658L16.8347 8.18749C16.7728 8.12808 16.699 8.08092 16.6178 8.04875C16.5365 8.01657 16.4494 8 16.3614 8C16.2733 8 16.1862 8.01657 16.1049 8.04875C16.0237 8.08092 15.95 8.12808 15.888 8.18749C15.7638 8.30624 15.6941 8.46689 15.6941 8.63434C15.6941 8.80179 15.7638 8.96244 15.888 9.08119L18.2616 11.3567H4.66674C4.48991 11.3567 4.32032 11.4234 4.19528 11.5423C4.07025 11.6612 4 11.8224 4 11.9905C4 12.1586 4.07025 12.3198 4.19528 12.4387C4.32032 12.5575 4.48991 12.6243 4.66674 12.6243H18.3016L15.888 14.9125C15.8255 14.9714 15.7759 15.0415 15.742 15.1187C15.7082 15.196 15.6908 15.2788 15.6908 15.3625C15.6908 15.4462 15.7082 15.529 15.742 15.6062C15.7759 15.6835 15.8255 15.7536 15.888 15.8125C15.95 15.8719 16.0237 15.9191 16.1049 15.9513C16.1862 15.9834 16.2733 16 16.3614 16C16.4494 16 16.5365 15.9834 16.6178 15.9513C16.699 15.9191 16.7728 15.8719 16.8347 15.8125L19.415 13.3532C19.7896 12.9967 20 12.5134 20 12.0095C20 11.5056 19.7896 11.0223 19.415 10.6658Z"
            fill="#EAEAEA"
        />
    </svg>
);

export const AddPhoto = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="81"
        viewBox="0 0 80 81"
        fill="none"
        style={{ left: "0", position: "absolute", cursor: "pointer" }}
    >
        <circle cx="40" cy="40.5" r="40" fill="white" />
        <path
            d="M50.0222 29.1889H49.2997L46.1936 25.1612C45.7933 24.646 45.281 24.2288 44.6955 23.941C44.1101 23.6532 43.4668 23.5024 42.8144 23.5H37.3189C36.6666 23.5024 36.0233 23.6532 35.4378 23.941C34.8523 24.2288 34.34 24.646 33.9397 25.1612L30.8336 29.1889H30.1111C28.2258 29.1911 26.4184 29.9411 25.0853 31.2742C23.7522 32.6073 23.0023 34.4147 23 36.3V50.5222C23.0023 52.4075 23.7522 54.2149 25.0853 55.548C26.4184 56.8811 28.2258 57.6311 30.1111 57.6333H50.0222C51.9075 57.6311 53.7149 56.8811 55.048 55.548C56.3811 54.2149 57.1311 52.4075 57.1333 50.5222V36.3C57.1311 34.4147 56.3811 32.6073 55.048 31.2742C53.7149 29.9411 51.9075 29.1911 50.0222 29.1889ZM36.1925 26.8991C36.3258 26.7271 36.4965 26.5877 36.6916 26.4916C36.8868 26.3955 37.1014 26.3452 37.3189 26.3444H42.8144C43.0319 26.3454 43.2464 26.3958 43.4416 26.4919C43.6367 26.588 43.8074 26.7273 43.9408 26.8991L45.7072 29.1889H34.4261L36.1925 26.8991ZM54.2889 50.5222C54.2889 51.6538 53.8394 52.7391 53.0392 53.5392C52.2391 54.3394 51.1538 54.7889 50.0222 54.7889H30.1111C28.9795 54.7889 27.8943 54.3394 27.0941 53.5392C26.294 52.7391 25.8444 51.6538 25.8444 50.5222V36.3C25.8444 35.1684 26.294 34.0832 27.0941 33.283C27.8943 32.4829 28.9795 32.0333 30.1111 32.0333H50.0222C51.1538 32.0333 52.2391 32.4829 53.0392 33.283C53.8394 34.0832 54.2889 35.1684 54.2889 36.3V50.5222Z"
            fill="#A1A1A1"
        />
        <path
            d="M40.0666 34.8777C38.3788 34.8777 36.729 35.3781 35.3257 36.3158C33.9224 37.2534 32.8287 38.5862 32.1828 40.1454C31.5369 41.7047 31.3679 43.4205 31.6972 45.0758C32.0265 46.7311 32.8392 48.2516 34.0326 49.445C35.226 50.6384 36.7465 51.4511 38.4018 51.7804C40.0571 52.1096 41.7729 51.9406 43.3321 51.2948C44.8914 50.6489 46.2241 49.5552 47.1618 48.1519C48.0994 46.7486 48.5999 45.0987 48.5999 43.411C48.5976 41.1485 47.6979 38.9793 46.0981 37.3795C44.4982 35.7797 42.3291 34.8799 40.0666 34.8777ZM40.0666 49.0999C38.9414 49.0999 37.8415 48.7662 36.906 48.1411C35.9705 47.516 35.2413 46.6275 34.8107 45.588C34.3801 44.5485 34.2675 43.4047 34.487 42.3011C34.7065 41.1976 35.2483 40.1839 36.0439 39.3883C36.8395 38.5927 37.8532 38.0509 38.9567 37.8314C40.0603 37.6119 41.2041 37.7246 42.2436 38.1551C43.2831 38.5857 44.1716 39.3149 44.7967 40.2504C45.4218 41.1859 45.7555 42.2858 45.7555 43.411C45.7555 44.9198 45.1561 46.3668 44.0892 47.4336C43.0224 48.5005 41.5754 49.0999 40.0666 49.0999Z"
            fill="#A1A1A1"
        />
        <path
            d="M69 61.5C67.4178 61.5 65.871 61.9692 64.5554 62.8482C63.2398 63.7273 62.2145 64.9767 61.609 66.4385C61.0035 67.9003 60.845 69.5089 61.1537 71.0607C61.4624 72.6126 62.2243 74.038 63.3431 75.1569C64.462 76.2757 65.8874 77.0376 67.4393 77.3463C68.9911 77.655 70.5997 77.4965 72.0615 76.891C73.5233 76.2855 74.7727 75.2602 75.6518 73.9446C76.5308 72.629 77 71.0822 77 69.5C76.9977 67.379 76.1541 65.3455 74.6543 63.8457C73.1545 62.3459 71.121 61.5023 69 61.5ZM72.3333 69.5C72.3333 69.6768 72.2631 69.8464 72.1381 69.9714C72.013 70.0964 71.8435 70.1667 71.6667 70.1667H69.6667V72.1667C69.6667 72.3435 69.5964 72.513 69.4714 72.6381C69.3464 72.7631 69.1768 72.8333 69 72.8333C68.8232 72.8333 68.6536 72.7631 68.5286 72.6381C68.4036 72.513 68.3333 72.3435 68.3333 72.1667V70.1667H66.3333C66.1565 70.1667 65.987 70.0964 65.8619 69.9714C65.7369 69.8464 65.6667 69.6768 65.6667 69.5C65.6667 69.3232 65.7369 69.1536 65.8619 69.0286C65.987 68.9036 66.1565 68.8333 66.3333 68.8333H68.3333V66.8333C68.3333 66.6565 68.4036 66.487 68.5286 66.3619C68.6536 66.2369 68.8232 66.1667 69 66.1667C69.1768 66.1667 69.3464 66.2369 69.4714 66.3619C69.5964 66.487 69.6667 66.6565 69.6667 66.8333V68.8333H71.6667C71.8435 68.8333 72.013 68.9036 72.1381 69.0286C72.2631 69.1536 72.3333 69.3232 72.3333 69.5Z"
            fill="#A1A1A1"
        />
        <path
            d="M72.1381 69.9714C72.2631 69.8464 72.3333 69.6768 72.3333 69.5C72.3333 69.3232 72.2631 69.1536 72.1381 69.0286C72.013 68.9036 71.8435 68.8333 71.6667 68.8333H69.6667V66.8333C69.6667 66.6565 69.5964 66.487 69.4714 66.3619C69.3464 66.2369 69.1768 66.1667 69 66.1667C68.8232 66.1667 68.6536 66.2369 68.5286 66.3619C68.4036 66.487 68.3333 66.6565 68.3333 66.8333V68.8333H66.3333C66.1565 68.8333 65.987 68.9036 65.8619 69.0286C65.7369 69.1536 65.6667 69.3232 65.6667 69.5C65.6667 69.6768 65.7369 69.8464 65.8619 69.9714C65.987 70.0964 66.1565 70.1667 66.3333 70.1667H68.3333V72.1667C68.3333 72.3435 68.4036 72.513 68.5286 72.6381C68.6536 72.7631 68.8232 72.8333 69 72.8333C69.1768 72.8333 69.3464 72.7631 69.4714 72.6381C69.5964 72.513 69.6667 72.3435 69.6667 72.1667V70.1667H71.6667C71.8435 70.1667 72.013 70.0964 72.1381 69.9714Z"
            fill="#EAEAEA"
        />
    </svg>
);
