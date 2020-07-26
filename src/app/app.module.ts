import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//agregados
import { MatSidenavModule }  from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarraHSComponent } from './componentes/barra-hs/barra-hs.component';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { InformeComponent } from './componentes/informe/informe.component';

import { SignupComponent } from './componentes/signup/signup.component';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms'

import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './servicios/token-interceptor.service';

import { SigninComponent } from './componentes/signin/signin.component';

import { PrivateTasksComponent } from './componentes/private-tasks/private-tasks.component';
import { FormInformeAPComponent } from './componentes/form-informe-ap/form-informe-ap.component';
import { TablaExpandibleComponent } from './componentes/tabla-expandible/tabla-expandible.component';

// Card
import { ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
// import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
// import { DemoMaterialModule} from './app/material-module';

import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatPaginatorModule} from '@angular/material/paginator';
import { TablaOrdPagComponent } from './componentes/tabla-ord-pag/tabla-ord-pag.component';
import { AdministracionComponent } from './componentes/administracion/administracion.component';
import { TablaOrdPagFilComponent } from './componentes/tabla-ord-pag-fil/tabla-ord-pag-fil.component';
// import { MatCheckboxModule} from '@angular/material/checkbox';

import {MatCheckboxModule} from '@angular/material/checkbox';
// import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormAdaptativoComponent ,  DialogOverviewExampleDialog } from './componentes/form-adaptativo/form-adaptativo.component';

import {MatDialogModule} from '@angular/material/dialog';
import { FileNameDialogComponent } from "../app/componentes/tabla-ord-pag-fil/file-name-dialog.component";

import {MatExpansionModule} from '@angular/material/expansion';
import { OpcionesPipe } from './opciones.pipe';

import {MatStepperModule} from '@angular/material/stepper';

//ojo
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { TEAuditoriasComponent, TEAuditoriaeDialog } from './componentes/t-e-auditorias/t-e-auditorias.component';
import { NuevaAuditoriaComponent } from './componentes/nueva-auditoria/nueva-auditoria.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { TablapopPipe } from './tablapop.pipe';
import { MatSortModule } from '@angular/material/sort';
import { TEInformeauditoriasComponent } from './t-e-informeauditorias/t-e-informeauditorias.component';
import { TablaGenComponent } from './componentes/tabla-gen/tabla-gen.component';
// import { TEAuditoriasDialogComponent } from './componentes/t-e-auditorias/t-e-auditorias-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CumplimientoPipe } from './cumplimiento.pipe'
// import { MatMomentDateModule } from '@angular/material-moment-adapter'


// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
 
// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);

@NgModule({
  declarations: [
    AppComponent,
    BarraHSComponent,
    InformeComponent,
    SignupComponent,
    SigninComponent,
    PrivateTasksComponent,
    FormInformeAPComponent,
    TablaExpandibleComponent,
    TablaOrdPagComponent,
    AdministracionComponent,
    TablaOrdPagFilComponent,
    FormAdaptativoComponent,
    DialogOverviewExampleDialog,
    FileNameDialogComponent,
    OpcionesPipe,
    TEAuditoriasComponent,
    NuevaAuditoriaComponent,
    TEAuditoriaeDialog,
    TablapopPipe,
    TEInformeauditoriasComponent,
    TablaGenComponent,
    CumplimientoPipe


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatSortModule,
    MatDatepickerModule,
    // MatMomentDateModule,
  ],
  entryComponents: [ DialogOverviewExampleDialog, FileNameDialogComponent ,TEAuditoriaeDialog, TEAuditoriasComponent], //, TEAuditoriasDialogComponent
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    // {provide: DateAdapter, useClass: AppDateAdapter},  
    // {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
    // {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }}
  ],
  bootstrap: [AppComponent],
  
  // declarations: [ LoginComponent , DialogOverviewExampleDialog],
  // entryComponents: [ DialogOverviewExampleDialog],
})




// import{MatDateFormats, MAT_DATE_FORMATS, NativeDateAdapter, DateAdapter} from '@angular/material';

// const MY_DATE_FORMATS = {
//     parse: {
//         dateInput: { day: 'numeric', month: 'numeric', year: 'numeric' }
//     },
//     display: {
//         dateInput: 'input',
//         monthYearLabel: { year: 'numeric', month: 'short' },
//         dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
//         monthYearA11yLabel: { year: 'numeric', month: 'long' },
//     }
//  };

 
 
 
 
 export class AppModule { }
 
//  export class AppDateAdapter extends NativeDateAdapter {
 
//      format(date: Date, displayFormat: Object): string {
//          if (displayFormat === 'input') {
//              const day = date.getDate();
//              const month = date.getMonth() + 1;
//              const year = date.getFullYear();
//              return `${day}/${month}/${year}`;
//          } else {
//              return date.toDateString();
//          }
//      }
//  }