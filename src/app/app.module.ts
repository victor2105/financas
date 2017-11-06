import { NgModule, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { EntradaPage } from '../pages/entrada/entrada';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SplashPage } from '../pages/splash/splash';
import { EntradaProvider } from '../providers/entrada/entrada';
import { SaidaProvider } from '../providers/saida/saida';
import { EstatisticasProvider } from '../providers/estatisticas/estatisticas';
import { GrupoComponent } from '../components/grupo/grupo';
import { CelulaComponent } from '../components/celula/celula';
import { GruposProvider } from '../providers/grupos/grupos';
import { CelulaModalPage } from '../pages/celula-modal/celula-modal';
import { DatabaseProvider } from '../providers/database/database';
import { SQLite } from '@ionic-native/sqlite';
import { EsquemaProvider } from '../providers/esquema/esquema';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    EntradaPage,
    TabsPage,
    SplashPage,
    GrupoComponent,
    CelulaComponent,
    CelulaModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    EntradaPage,
    TabsPage,
    SplashPage,
    CelulaModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EntradaProvider,
    SaidaProvider,
    EstatisticasProvider,
    GruposProvider,
    EsquemaProvider
  ]
})
export class AppModule {}
