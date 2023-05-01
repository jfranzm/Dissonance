import * as userServices from '../../utilities/services/users'

export default function OrderHistoryPage() {
  async function handleCheckToken() {
    const expDate = await userServices.checkToken()
    console.log(expDate)
  }
  return (
    <>
    <h1>OrderHistoryPage</h1>
    <button onClick={handleCheckToken}>Check When My Login Expires</button>
    </>
    
  );
}