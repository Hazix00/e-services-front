import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HtmlModel } from '@syncfusion/ej2-diagrams';
import {
  BasicShapeModel,
  ConnectorModel,
  DiagramComponent,
  FlowShape,
  FlowShapeModel,
  IClickEventArgs,
  IMouseEventArgs,
  ISelectionChangeEventArgs,
  NodeConstraints,
  NodeModel,
  OrthogonalSegmentModel,
  PointModel,
  PointPortModel,
  ShapeModel,
  ShapeStyleModel,
  SnapConstraints,
  SnapSettingsModel
} from '@syncfusion/ej2-angular-diagrams';

export interface EmployeeInfo {
  Name: string;
  Role: string;
  color: string;
}


@Component({
  selector: 'app-workflows-management',
  templateUrl: './workflows-management.component.html',
  styleUrls: ['./workflows-management.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkflowsManagementComponent implements OnInit {

  @ViewChild('diagram')
  public diagram!: DiagramComponent;

  public snapSettings: SnapSettingsModel = {
    constraints: SnapConstraints.None
  }

  //The start Node
  public startShape: BasicShapeModel = {
    type:'Basic',
    shape: 'Ellipse'
  };
  public startStyle: ShapeStyleModel = {
    fill: '#00C2D1',
    strokeColor: 'white'
  }
  public startNodeConstraints = {
    constraints: NodeConstraints.Default
        // & ~NodeConstraints.InConnect
        // & ~NodeConstraints.Select
        // & ~NodeConstraints.Resize
  }

  //process shape
  public processShape: FlowShapeModel = {
    type: 'Flow',
    shape: 'Process'
  }
  //decision shape
  public decisionShape: FlowShapeModel = {
    type: 'Flow',
    shape: 'Decision'
  }

  //The Input Node
  public inputShape: HtmlModel = {
    type:'HTML'
  };

  //segments
  public segments: OrthogonalSegmentModel[] = [
    { type: 'Orthogonal' , direction: 'Left', length:100 },
    { type: 'Orthogonal' , direction: 'Top', length:400 },
  ]

  mouseEnter(args: IMouseEventArgs) {
    const theObject = args.actualObject as any
    const element = args.actualObject as NodeModel | ConnectorModel
    if(theObject?.propName === "connectors") {
      // console.log('mouse enter', theObject);
    }
    else if(theObject?.propName === "nodes") {
      if(element.id === "start2") {
        console.log('okey')
      }
    }
  }

  mouseLeave(args: IMouseEventArgs) {
    const theObject = args.element as any
    if(theObject?.propName === "connectors") {
      // console.log('mouse leave', theObject);
    }
  }

  directions = ['top', 'right', 'bottom', 'left']
  selectionChange(args: ISelectionChangeEventArgs) {
    // If the user selected a node
    if (args.state === 'Changing') {
      const theObject = args.newValue[0] as any

      if (theObject?.propName === "nodes") { // a node is selected

        const selectedNode = args.newValue[0] as NodeModel
        if(selectedNode.shape?.type === 'HTML') return;

        // clear action connectors
        this.removeActionNode()
        this.removeActionConnectors()
        let connectorsInDirections: { [key: string]: Boolean} = {
          top: false,
          right: false,
          bottom: false,
          left: false
        }

        // get directions where connectors are connected in the selected Node
        const shapeType = selectedNode?.shape as FlowShape
        if(shapeType.shape === 'Decision' || shapeType.shape === 'Process') {
          theObject.inEdges.forEach( (connectorId: string) => {
            const connector = this.diagram.getConnectorObject(connectorId)
            const directions = this.getPointDirectionItIsIn(selectedNode, connector.targetPoint!)
            for(const direction in directions) {
              if(directions[direction])
                connectorsInDirections[direction] = true
            }
          })
          // get directions where connectors are connected out of the selected Node
          theObject.outEdges.forEach( (connectorId: string) => {
            const connector = this.diagram.getConnectorObject(connectorId)
            const directions = this.getPointDirectionItIsIn(selectedNode, connector.sourcePoint!)
            for(const direction in directions) {
              if(directions[direction])
              connectorsInDirections[direction] = true
            }
          })
          for(const direction in connectorsInDirections) {
            if(connectorsInDirections[direction] === false)
              this.AddConnectorInDirection(selectedNode, direction)
          }
        }
        else {
          if(theObject.outEdges.length === 0) {
            this.AddConnectorInDirection(selectedNode, 'bottom')
          }
        }
      }
      if (theObject?.propName === "connectors" && theObject?.id.includes('actionConnector-') ) { // an action connector is selected
        const selectedConnector = theObject as ConnectorModel
        console.log('Action connector ', selectedConnector.id, ' is selected')

        let point: PointModel
        const node: NodeModel = {
          id: 'actionNode',
          offsetX: selectedConnector.targetPoint?.x! + 100,
          offsetY: selectedConnector.targetPoint?.y! + 100,
          shape: this.inputShape
        }

        this.diagram.addNode(node)
      }
    }
    // clear action nodes if nothing is selected
    if(!args.newValue[0] && args.state === 'Changed') {
      this.removeActionNode()
      this.removeActionConnectors()
    }
  }


  getPointDirectionItIsIn(selectedNode: NodeModel, point: PointModel) {
    let connectorsInDirections: { [key: string]: Boolean} = {
      top: false,
      right: false,
      bottom: false,
      left: false
    }
    if( point.y! < selectedNode.offsetY! ){
      connectorsInDirections.top = true
    }
    if( point.y! > selectedNode.offsetY! ){
      connectorsInDirections.bottom = true
    }
    if( point.x! < selectedNode.offsetX! ){
      connectorsInDirections.left = true
    }
    if( point.x! > selectedNode.offsetX! ){
      connectorsInDirections.right = true
    }
    return connectorsInDirections
  }

  // Draw action connector in the specified direction from seleted node
  AddConnectorInDirection(selectedNode: NodeModel, direction: string, offset: number = 100) {

    const targetPoint: PointModel = {
      x: selectedNode.offsetX,
      y: selectedNode.offsetY,
    }
    switch(direction) {
      case 'top':
        targetPoint.y! -= offset
        break
      case 'bottom':
        targetPoint.y! += offset
        break
      case 'right':
        targetPoint.x! += offset
        break
      case 'left':
        targetPoint.x! -= offset
    }
    const connectorColor = "#bcbcbc"
    const connector: ConnectorModel = {
      id: 'actionConnector-' + direction,
      sourceID: selectedNode.id,
      type: 'Orthogonal',
      targetPoint,
      style: {
        strokeColor: connectorColor,
        fill: connectorColor,
        strokeWidth: 8
      },
      targetDecorator: {
        style: {
          fill: connectorColor,
          strokeColor: connectorColor,
          strokeWidth: 7
        },
        height: 5,
        width: 2
      }
    }
    this.diagram.addConnector(connector)
  }

  removeActionNode() {
    const node = this.diagram.getNodeObject('actionNode')
    this.diagram.remove(node)
  }
  removeActionConnectors() {
    this.directions.forEach( direction => {
      const connector = this.diagram.getConnectorObject('actionConnector-' + direction)
      this.diagram.remove(connector)
    })
  }
  click(args: IClickEventArgs) {
    // console.log(args)
  }

  getNodeDefaults(obj: NodeModel): NodeModel {
    obj.width = 100
    obj.height = 100
    return obj
  }

  // The defauls connector styles
  getDefaultConnector(): ConnectorModel {
    const connectorColor = '#1B478E'
    const obj: ConnectorModel = {
      type: "Orthogonal",
      sourcePadding: 20,
      // Set Target Padding value
      targetPadding: 20,

      style: {
        strokeColor: connectorColor,
        fill: connectorColor,
        strokeWidth: 8,
      },
      targetDecorator: {
        style: {
          fill: connectorColor,
          strokeColor: connectorColor,
          strokeWidth: 7
        },
        height: 5,
        width: 2
      }
    }
    return obj
  }

  // node ports
  public ports: PointPortModel[] = [
    { id: 'port1', offset: { x: 0, y: 0.5 } },
    { id: 'port2', offset: { x: 0.5, y: 1 } },
    { id: 'port3', offset: { x: 1, y: 0.5 } },
    { id: 'port4', offset: { x: 0.5, y: 0 } }
  ];

  public created(args: Object): void {
    // adding connectors between nodes
    this.diagram.addConnector( {
      id: 'connector',
      sourceID: 'start',
      targetID: 'another',
      ...this.getDefaultConnector(),
    })

    this.diagram.addConnector( {
      id: 'connector2',
      sourceID: 'another',
      targetID: 'another2',
      ...this.getDefaultConnector(),
    })
    this.diagram.addConnector( {
      id: 'connector3',
      sourceID: 'another2',
      targetID: 'decision1',
      ...this.getDefaultConnector(),
    })
    this.diagram.addConnector( {
      id: 'connector4',
      sourceID: 'decision1',
      targetID: 'another',
      segments: this.segments,
      annotations: [{content: 'No'}],
      ...this.getDefaultConnector(),
    })
    this.diagram.addConnector( {
      id: 'connector5',
      sourceID: 'decision1',
      targetID: 'process3',
      annotations: [{content: "Yes"}],
      ...this.getDefaultConnector(),
    })
    this.diagram.addConnector( {
      id: 'connector6',
      sourceID: 'process3',
      targetID: 'end',
      ...this.getDefaultConnector(),
    })

    // Method to add ports through run time
    this.diagram.nodes.forEach( node => {
      if((node.shape as any).flowShape !== 'Terminator') {
        this.diagram.addPorts(node, this.ports)
      }
    })
  }

  ngOnInit(): void {
  }
}
