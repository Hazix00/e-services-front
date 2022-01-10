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
  // styleUrls: ['./workflows-management.component.scss']
  encapsulation: ViewEncapsulation.None
})
export class WorkflowsManagementComponent implements OnInit {

  @ViewChild('diagram')
  public diagram!: DiagramComponent;
  // public diagramConstraints: DiagramConstraints =
  //       DiagramConstraints.Default | DiagramConstraints.LineRouting


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
    constraints: NodeConstraints.Default & ~NodeConstraints.InConnect & ~NodeConstraints.Select
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
    //if(args.type === 'Removal') return
    if (args.state === 'Changing'
        && (args.newValue[0] as any)?.propName === "nodes") {

      const selectedNode = args.newValue[0] as NodeModel
      const theObject = args.newValue[0] as any
      let connectorsInDirections: { [key: string]: Boolean} = {
        top: false,
        right: false,
        bottom: false,
        left: false
      }
      // get directions where connectors are connected in the selected Node
      theObject.inEdges.forEach( (connectorId: string) => {
        const connector = this.diagram.getConnectorObject(connectorId)
        const directions = this.getPointDirectionItIsIn(selectedNode, connector.targetPoint!)
        for(const direction in directions) {
          if(directions[direction])
          connectorsInDirections[direction] = true
        }
        console.log('directions In', directions)
      })
      // get directions where connectors are connected out of the selected Node
      theObject.outEdges.forEach( (connectorId: string) => {
        const connector = this.diagram.getConnectorObject(connectorId)
        const directions = this.getPointDirectionItIsIn(selectedNode, connector.sourcePoint!)
        for(const direction in directions) {
          if(directions[direction])
          connectorsInDirections[direction] = true
        }
        console.log('directions Out', directions)
      })

      console.log(connectorsInDirections)


      const shapeType = selectedNode?.shape as FlowShape
      if(shapeType.shape === 'Decision') {

        // const node: NodeModel = {
        //   // Position of the node
        //   offsetX: selectedNode.offsetX,
        //   offsetY: selectedNode.offsetY! + 200,
        //   shape: this.inputShape,
        //   id: 'Node'
        // }
        for(const direction in connectorsInDirections) {
          if(connectorsInDirections[direction] === false)
            this.AddConnectorInDirection(selectedNode, direction)
        }

      }
      // else {
      //   //remove temporary node and connectors
      //   this.removeActionNode()
      //   this.removeActionConnectors()
      // }
    }
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

  AddConnectorInDirection(selectedNode: NodeModel, direction: string, offset: number = 200) {

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
    const connector: ConnectorModel = {
      id: 'actionConnector-' + direction,
      sourceID: selectedNode.id,
      type: 'Orthogonal',
      targetPoint,
    }
    this.diagram.addConnector(connector)
  }

  removeActionNode() {
    const node = this.diagram.getNodeObject('Node')
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

  getConnectorDefaults(obj: ConnectorModel): ConnectorModel {

    // Set Source Padding value
    obj.sourcePadding = 20
    // Set Target Padding value
    obj.targetPadding = 20

    // obj.connectionPadding = 20
    // obj.hitPadding = 20
    const connectorColor = '#1B478E'
    obj.style = {
      strokeColor: connectorColor,
      fill: connectorColor,
      strokeWidth: 8,
    }
    obj.targetDecorator = {
      style: {
        fill: connectorColor,
        strokeColor: connectorColor,
        strokeWidth: 7
      },
      height: 5,
      width: 2
    }

    return obj
  }

  public ports: PointPortModel[] = [
    { id: 'port1', offset: { x: 0, y: 0.5 } },
    { id: 'port2', offset: { x: 0.5, y: 1 } },
    { id: 'port3', offset: { x: 1, y: 0.5 } },
    { id: 'port4', offset: { x: 0.5, y: 0 } }
  ];

  public created(args: Object): void {
    // Method to add ports through run time
    // this.diagram.addPorts(this.diagram.nodes[0], this.ports);

    this.diagram.nodes.forEach( node => {
      if((node.shape as any).flowShape !== 'Terminator') {
        this.diagram.addPorts(node, this.ports)
      }
    })
  }

  ngOnInit(): void {
  }
}
