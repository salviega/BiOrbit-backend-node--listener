import axios from 'axios'
import ethers from 'ethers'
import biorbitJson from './assets/json/contracts/Biorbit.json' assert { type: 'json' }

const provider = new ethers.providers.JsonRpcProvider(
	'https://rpc-mumbai.maticvigil.com'
)

const biorbitAddress = biorbitJson.address
const biorbitAbi = biorbitJson.abi

const contract = new ethers.Contract(biorbitAddress, biorbitAbi, provider)

const eventName = 'ProtectedAreaCreated'
const callback = (_id, _name, _footprint) => {
	const bigNumber = ethers.BigNumber.from(_id)
	const _idInteger = parseInt(bigNumber.toString(), 10)

	const object = {
		_idInteger,
		_name,
		_footprint
	}

	console.debug(object)

	// axios
	// 	.post('http://localhost:5000/processing', {
	// 		data: object
	// 	})
	// 	.then(function (response) {
	// 		console.log(response)
	// 	})
	// 	.catch(function (error) {
	// 		console.log(error)
	// 	})
}

contract.on(eventName, callback)
