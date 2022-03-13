import * as React from 'react';
declare type MaterialUIIcon = any;
interface InfoCardProps {
    message: React.ReactNode;
    button?: React.ReactNode;
    color: string;
    icon: MaterialUIIcon;
}
declare const InfoCard: (props: InfoCardProps) => JSX.Element;
export default InfoCard;
