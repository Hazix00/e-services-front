import { NgModule } from '@angular/core';
import { DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { HierarchicalTreeService, MindMapService, RadialTreeService, ComplexHierarchicalTreeService } from '@syncfusion/ej2-angular-diagrams';
import { DataBindingService, SnappingService, PrintAndExportService, BpmnDiagramsService} from '@syncfusion/ej2-angular-diagrams';
import { SymmetricLayoutService, ConnectorBridgingService, UndoRedoService, LayoutAnimationService} from '@syncfusion/ej2-angular-diagrams';
import { DiagramContextMenuService, ConnectorEditingService } from '@syncfusion/ej2-angular-diagrams';


@NgModule({
  declarations: [],
  imports: [ DiagramModule ],
  exports: [ DiagramModule ],
  providers: [
    HierarchicalTreeService,
    // MindMapService,
    // RadialTreeService,
    // ComplexHierarchicalTreeService,
    DataBindingService,
    // SnappingService,
    // PrintAndExportService,
    // BpmnDiagramsService,
    // SymmetricLayoutService,
    // ConnectorBridgingService,
    // UndoRedoService,
    // LayoutAnimationService,
    // DiagramContextMenuService,
    // ConnectorEditingService
  ]
})
export class Ej2DiagramModule { }
