import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { delay, takeWhile } from 'rxjs/operators';
import { LayoutService } from '../../../../@core/utils/layout.service';


@Component({
  selector: 'ngx-visitors-statistics',
  styleUrls: ['./visitors-statistics.component.scss'],
  templateUrl: './visitors-statistics.component.html',
})
export class ECommerceVisitorsStatisticsComponent implements AfterViewInit, OnDestroy {

  private alive = true;

  @Input() value: number;

  option: any = {};
  chartLegend: { iconColor: string; title: string }[];
  echartsIntance: any;

  constructor(private theme: NbThemeService,
              private layoutService: LayoutService) {
    this.layoutService.onChangeLayoutSize()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe(() => this.resizeChart());
  }

  ngAfterViewInit() {
    this.theme.getJsTheme()
      .pipe(
        takeWhile(() => this.alive),
        delay(1),
      )
      .subscribe(config => {
        const variables: any = config.variables;
        const visitorsPieLegend: any = config.variables.visitorsPieLegend;

        this.setOptions(variables);
        this.setLegendItems(visitorsPieLegend);
    });
  }

  setLegendItems(visitorsPieLegend) {
    this.chartLegend = [
      {
        iconColor: visitorsPieLegend.firstSection,
        title: 'New Visitors',
      },
      {
        iconColor: visitorsPieLegend.secondSection,
        title: 'Return Visitors',
      },
    ];
  }

  setOptions(variables) {
    const visitorsPie: any = variables.visitorsPie;

  //   this.option = {
  //     tooltip: {
  //       trigger: 'item',
  //       formatter: '',
  //     },
  //     series: [
  //       {
  //         name: ' ',
  //         clockWise: true,
  //         hoverAnimation: false,
  //         type: 'pie',
  //         center: ['50%', '50%'],
  //         radius: visitorsPie.firstPieRadius,
  //         data: [
  //           {
  //             value: this.value,
  //             name: ' ',
  //             label: {
  //               normal: {
  //                 position: 'center',
  //                 formatter: '',
  //                 textStyle: {
  //                   fontSize: '22',
  //                   fontFamily: variables.fontSecondary,
  //                   fontWeight: '600',
  //                   color: variables.fgHeading,
  //                 },
  //               },
  //             },
  //             tooltip: {
  //               show: false,
  //             },
  //             itemStyle: {
  //               normal: {
  //                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //                   {
  //                     offset: 0,
  //                     color: visitorsPie.firstPieGradientLeft,
  //                   },
  //                   {
  //                     offset: 1,
  //                     color: visitorsPie.firstPieGradientRight,
  //                   },
  //                 ]),
  //                 shadowColor: visitorsPie.firstPieShadowColor,
  //                 shadowBlur: 0,
  //                 shadowOffsetX: 0,
  //                 shadowOffsetY: 3,
  //               },
  //             },
  //             hoverAnimation: false,
  //           },
  //           {
  //             value: 100 - this.value,
  //             name: ' ',
  //             tooltip: {
  //               show: false,
  //             },
  //             label: {
  //               normal: {
  //                 position: 'inner',
  //               },
  //             },
  //             itemStyle: {
  //               normal: {
  //                 color: variables.layoutBg,
  //               },
  //             },
  //           },
  //         ],
  //       },
  //       {
  //         name: ' ',
  //         clockWise: true,
  //         hoverAnimation: false,
  //         type: 'pie',
  //         center: ['50%', '50%'],
  //         radius: visitorsPie.secondPieRadius,
  //         data: [
  //           {
  //             value: this.value,
  //             name: ' ',
  //             label: {
  //               normal: {
  //                 position: 'center',
  //                 formatter: '',
  //                 textStyle: {
  //                   fontSize: '22',
  //                   fontFamily: variables.fontSecondary,
  //                   fontWeight: '600',
  //                   color: variables.fgHeading,
  //                 },
  //               },
  //             },
  //             tooltip: {
  //               show: false,
  //             },
  //             itemStyle: {
  //               normal: {
  //                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1),
  //               },
  //             },
  //             hoverAnimation: false,
  //           },
  //           {
  //             value: 100 - this.value,
  //             name: ' ',
  //             tooltip: {
  //               show: false,
  //             },
  //             label: {
  //               normal: {
  //                 position: 'inner',
  //               },
  //             },
  //             itemStyle: {
  //               normal: {
  //                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //                   {
  //                     offset: 0,
  //                     color: visitorsPie.secondPieGradientLeft,
  //                   },
  //                   {
  //                     offset: 1,
  //                     color: visitorsPie.secondPieGradientRight,
  //                   },
  //                 ]),
  //                 shadowColor: visitorsPie.secondPieShadowColor,
  //                 shadowBlur: 0,
  //                 shadowOffsetX: visitorsPie.shadowOffsetX,
  //                 shadowOffsetY: visitorsPie.shadowOffsetY,
  //               },
  //             },
  //           },
  //         ],
  //       },
  //     ],
  //   };
  this.option = {
    backgroundColor: '#fff',
    // // title: {
    // //   text: 'Dashboard Chart',
    // //   left: 'center',
    // //   top: 20,
    // //   textStyle: {
    // //     color: '#000000'
    // //   }
    // },

    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1]
      }
    },
    series: [
      {
        name: 'Dashboard Analytics',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: [
          {value: 335, name: 'Interview'},
          {value: 310, name: 'Equipment'},
          {value: 274, name: 'Medicine'},
          {value: 235, name: 'Visitiors'},
          {value: 400, name: 'Mobile'}
        ],
        roseType: 'radius',
        label: {
          normal: {
            textStyle: {
              color: '#000000'
            }
          }
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: 'rgba(0, 255, 0, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        },
        itemStyle: {
          normal: {
            //color: '#0000FF',
           // shadowBlur: 200,
            // shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
       // animationType: 'scale',
       // animationEasing: 'elasticOut'
      }
    ]
  };

   }

  onChartInit(echarts) {
    this.echartsIntance = echarts;
  }

  resizeChart() {
    if (this.echartsIntance) {
      this.echartsIntance.resize();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
