import React from "react";
import { Card, CardHeader, CardBody } from "shards-react";
import Chart from "react-google-charts";

const pieOptions = {
    title: "",
    pieHole: 0.7,
    is3D: true,
    legend: {
      alignment: "center",
      textStyle: {
        color: "233238",
        fontSize: 18
      }
    },
    tooltip: {
      showColorCode: true
    },
    chartArea: {
      left: 0,
      top: 0,
      width: "100%",
      height: "80%"
    },
    fontName: "Roboto"
  };

class HoldingWeights extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
        holdingWeights:[],
        holdingWeightLoaded:false,
    };

    this.fetchHoldingList = this.fetchHoldingList.bind(this);
   }

   async componentDidMount() {
    this.fetchHoldingList(this.props.portfolio);
   }

   componentWillReceiveProps(nextProps) {
    this.setState({holdingWeightLoaded: nextProps.holdingWeightLoaded})
    this.fetchHoldingList(nextProps.portfolio)
   }

   async fetchHoldingList(portfolio) {
    let apiUrl;
    if (portfolio === 'zerodha') {
        apiUrl = 'http://localhost:8000/v1/api/user/rajwaitu@gmail.com/portfolio/1/holding'
    }else if(portfolio === 'upstox'){
        apiUrl = 'http://localhost:8000/v1/api/user/rajwaitu@gmail.com/portfolio/2/holding'
    }else if(portfolio === 'angel'){
        apiUrl = 'http://localhost:8000/v1/api/user/rajwaitu@gmail.com/portfolio/3/holding'
    }else if(portfolio === 'groww'){
        apiUrl = 'http://localhost:8000/v1/api/user/rajwaitu@gmail.com/portfolio/4/holding'
    }

    const response = await fetch(apiUrl);
    const holdingView = await response.json();

    let holdingObjArr = []
    let holdingScripInvestmentArr = []
    holdingView.holdings.map((item) => holdingObjArr.push({"scrip":item.id,"investment":item.investmentasnumber}));
    holdingObjArr.sort((a,b) => a.investment - b.investment);

    holdingScripInvestmentArr.push(['Task', 'Hours per Day'])
    holdingObjArr.forEach((item) => {
        let holdings = [];
        holdings.push(item.scrip)
        holdings.push(item.investment)
        holdingScripInvestmentArr.push(holdings)
    });

    console.log('holdingScripInvestmentArr')
    console.log(holdingScripInvestmentArr)

    this.setState({ holdingWeights: holdingScripInvestmentArr });
    this.setState({holdingWeightLoaded: true });
  }

    render() {
        const isLoaded = this.state.holdingWeightLoaded;
        console.log('this.state.holdingWeight')
        console.log(this.state.holdingWeights)
      return (
        <Card small className="h-100">
        <CardHeader className="border-bottom">
        <h6 className="m-0">Holding Allocation - {this.props.portfolio}</h6>
        </CardHeader>
        <CardBody className="pt-0">
            {isLoaded ? (<Chart
            width={'800px'}
            height={'500px'}
            chartType="PieChart"
            data={this.state.holdingWeights}
            options={pieOptions}
            rootProps={{ 'data-testid': '2' }}/>)
            : (<p>Loading Holding Allocation...</p>)}
        </CardBody>
        </Card>
       );
     }
    }
  export default HoldingWeights;