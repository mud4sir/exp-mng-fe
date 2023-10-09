
import Expense from '../../components/consultant/Expense'
import Layout from '../../components/Layout'
import { useContextApi } from '../../context/Context'

const ConsultantPage = () => {
  const { user } = useContextApi()

  return (
    <Layout title={`${user ? user.name + ' Expenses' : 'User Details'}`}>
      {user && <Expense />}
    </Layout>
  )
}

export default ConsultantPage
