// ** React Imports
import { Fragment, useContext } from 'react'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Custom Hooks
import { useRTL } from '@hooks/useRTL'

// ** Custom Components
// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Charts
import ApexLineChart from './apex/ApexLineChart'
import ApexDonutChart from './apex/ApexDonutChart'
import SupportTracker from "./analytics/SupportTracker"
import TableResponsive from "./tableCPU/tableCpu"

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'


const ApexCharts = () => {
  // ** Hooks
  const [isRtl, setIsRtl] = useRTL()

  // ** Theme Colors
  const { colors } = useContext(ThemeColors)

  return (
    <Fragment>
      <Row className='match-height'>
        <Col xl='6' lg='12'>
          <ApexDonutChart />
        </Col>
        <Col lg='6' xs='12'>
          <SupportTracker primary={colors.primary.main} danger={colors.danger.main} />
        </Col>
        <Col sm='12' className = "mt-3">
          <ApexLineChart direction={isRtl ? 'rtl' : 'ltr'} warning={colors.warning.main} />
        </Col>
        <Col sm = "12" className = "mt-3">
            <TableResponsive />
        </Col>
      </Row>
    </Fragment>
  )
}

export default ApexCharts
