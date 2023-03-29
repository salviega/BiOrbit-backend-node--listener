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
const callback = (id, name, photo, description, geoJson, country) => {
	console.log('id: ', id)
	console.log('name: ', name)
	console.log('photo: ', photo)
	console.log('description: ', description)
	console.log('geoJson: ', geoJson)
	console.log('country: ', country)

	const bigNumber = ethers.BigNumber.from(id)
	const idInteger = parseInt(bigNumber.toString(), 10)

	const object = {
		idInteger,
		name,
		photo,
		description,
		geoJson,
		country
	}

	axios
		.post('http://localhost:5000/processing', {
			data: object
		})
		.then(function (response) {
			console.log(response)
		})
		.catch(function (error) {
			console.log(error)
		})
}

contract.on(eventName, callback)
