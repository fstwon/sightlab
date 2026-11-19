// 아이콘 목록. @sightlab/icons는 exports가 ./*.svg 패턴뿐이라 파일 목록을 얻을 공개 경로가 없어,
// 공개 경로로 하나씩 불러온다 (다른 패키지 내부 파일 참조 금지). 아이콘을 추가하면 이 목록도 수정한다.
import arrowLeft from '@sightlab/icons/arrow-left.svg?raw';
import arrowRight from '@sightlab/icons/arrow-right.svg?raw';
import arrowUp from '@sightlab/icons/arrow-up.svg?raw';
import check from '@sightlab/icons/check.svg?raw';
import chevronDown from '@sightlab/icons/chevron-down.svg?raw';
import chevronLeft from '@sightlab/icons/chevron-left.svg?raw';
import chevronRight from '@sightlab/icons/chevron-right.svg?raw';
import chevronUp from '@sightlab/icons/chevron-up.svg?raw';
import close from '@sightlab/icons/close.svg?raw';
import copy from '@sightlab/icons/copy.svg?raw';
import externalLink from '@sightlab/icons/external-link.svg?raw';
import filter from '@sightlab/icons/filter.svg?raw';
import menu from '@sightlab/icons/menu.svg?raw';
import more from '@sightlab/icons/more.svg?raw';
import refresh from '@sightlab/icons/refresh.svg?raw';
import search from '@sightlab/icons/search.svg?raw';

export type Icon = { name: string; svg: string };

export const ICONS: Icon[] = [
  { name: 'arrow-left', svg: arrowLeft },
  { name: 'arrow-right', svg: arrowRight },
  { name: 'arrow-up', svg: arrowUp },
  { name: 'check', svg: check },
  { name: 'chevron-down', svg: chevronDown },
  { name: 'chevron-left', svg: chevronLeft },
  { name: 'chevron-right', svg: chevronRight },
  { name: 'chevron-up', svg: chevronUp },
  { name: 'close', svg: close },
  { name: 'copy', svg: copy },
  { name: 'external-link', svg: externalLink },
  { name: 'filter', svg: filter },
  { name: 'menu', svg: menu },
  { name: 'more', svg: more },
  { name: 'refresh', svg: refresh },
  { name: 'search', svg: search },
];
