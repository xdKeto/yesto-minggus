import { getIconUrl } from '../../utils/assetLoader';

export default function ArrowIcon({ close = false, className = '' }) {
  return <img src={getIconUrl(`arrow_${close ? 'close' : 'open'}.svg`)} alt="" aria-hidden="true" className={className} />;
}
