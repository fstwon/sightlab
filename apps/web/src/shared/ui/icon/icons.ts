import ArrowLeftSvg from '@sightlab/icons/arrow-left.svg';
import ArrowRightSvg from '@sightlab/icons/arrow-right.svg';
import ArrowUpSvg from '@sightlab/icons/arrow-up.svg';
import LogoSymbolSvg from '@sightlab/icons/brand/logo-symbol.svg';
import CheckSvg from '@sightlab/icons/check.svg';
import ChevronDownSvg from '@sightlab/icons/chevron-down.svg';
import CloseSvg from '@sightlab/icons/close.svg';
import CopySvg from '@sightlab/icons/copy.svg';
import ExclamationSvg from '@sightlab/icons/exclamation.svg';
import InfoSvg from '@sightlab/icons/info.svg';
import MenuSvg from '@sightlab/icons/menu.svg';
import SearchSvg from '@sightlab/icons/search.svg';
import type { ComponentType, SVGProps } from 'react';

// SVG는 next.config.ts의 SVGR 설정으로 React 컴포넌트가 된다.
// Next 기본 타입 선언은 *.svg를 any로 두므로 여기서 컴포넌트 타입을 붙여 공개한다.
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const ArrowLeftIcon = ArrowLeftSvg as IconComponent;
export const ArrowRightIcon = ArrowRightSvg as IconComponent;
export const ArrowUpIcon = ArrowUpSvg as IconComponent;
export const CheckIcon = CheckSvg as IconComponent;
export const ChevronDownIcon = ChevronDownSvg as IconComponent;
export const CloseIcon = CloseSvg as IconComponent;
export const CopyIcon = CopySvg as IconComponent;
export const ExclamationIcon = ExclamationSvg as IconComponent;
export const InfoIcon = InfoSvg as IconComponent;
export const MenuIcon = MenuSvg as IconComponent;
export const SearchIcon = SearchSvg as IconComponent;

// 브랜드 심볼: 원·타원은 currentColor, 가운데 점은 accent 토큰 색
export const LogoSymbol = LogoSymbolSvg as IconComponent;
