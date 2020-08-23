import { RESTDataSource } from 'apollo-datasource-rest';
// @ts-ignore
import { Robinhood } from 'algotrader';
const User = Robinhood.User;

const options = {
	doNotSaveToDisk: true
};

let mainUser: any = null

export class RobinhoodAPI extends RESTDataSource {
	constructor() {
		super();
		this.getUser();
	}

	private getUser() {
		const loadedUser = mainUser;
		if (loadedUser) {
			console.log('Load saved user')
			if (!loadedUser.isAuthenticated()) {
				console.log('authenticate saved user');
				loadedUser.reauthenticate();
			}
			return loadedUser;
		} else {
			console.log('Create new user')
			const user = new User('stonks.go.brrr@gmail.com', 'qLS&fUmIM3c&2*j^Qx3', 'e0063428-35ad-4f61-974c-c181ba33482c', options);
			return this.authenticateUser(user);
		}
	}

	private authenticateUser(user: any) {
		return user
			.authenticate('qLS&fUmIM3c&2*j^Qx3')
			.then((authenticatedUser: any) => {
				console.log('RobinHood user authenticated');
				// authenticatedUser.save();
				mainUser = authenticatedUser;
				return authenticatedUser;
			})
			.catch((e: any) => {
				console.log(e);
				return null;
			});
	}

	// async getPortfolio() {
	// 	const data = await this.user.getPortfolio();
	// 	console.log(data);
	// 	return data;
	// }
}
