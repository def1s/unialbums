import './loading.scss';

import spinner from '../../img/spinner.gif'

const Loading = () => {
	return (
		<img src={spinner} alt="" className='spinner'/>
	)
}

export default Loading;