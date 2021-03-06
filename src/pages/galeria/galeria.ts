import { Component, ViewChild, OnDestroy, OnChanges } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, Content } from 'ionic-angular';
import { ProjectListService } from '../../services/project-list/project-list.service';
import { Cel } from '../../models/cel';
import { Observable } from 'rxjs/Observable';
import { ProjectPage } from '../project/project';
import { NovoProjetoPage } from '../novo-projeto/novo-projeto';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'galeria',
  templateUrl: 'galeria.html',
})
export class GaleriaPage {
  
  @ViewChild (Content) content: Content;


  email: string;
  projectList$ : Observable<Cel[]> ;
  project: Cel;


  constructor(
    public navCtrl: NavController,
    public authCtrl: AuthProvider,
    private alertCtrl: AlertController,
    private actionSheet: ActionSheetController,
    public navParams: NavParams,
    private projectCtrl : ProjectListService)
  {
    this.email = authCtrl.getUserEmail();

    this.projectCtrl.loadUserProjects(this.email);

    this.projectList$ = this.projectCtrl.getObservable();
  
  }

  ionViewWillEnter() {
    this.content.resize();
  }

  newProject(){
    this.navCtrl.push(NovoProjetoPage)
    .then(() => {
    })
    .catch(() => {
    });
  }

  editProject(project) {
    this.navCtrl.push(NovoProjetoPage, { project: project })
      .then(() => {
      })
      .catch(() => {
      });
  }

  openProject(project) {
    this.navCtrl.push(ProjectPage, {project: project})
    .then(() => {
    })
    .catch(() => {
    });
  }

  selectProject(project) {
    this.project = project;
    this.actionSheet.create({
      title: `${this.project.name}`,
      buttons : [
        {
          text: 'Editar',
          handler: () => {
            this.editProject(this.project);
          }
        },
        {
          text: 'Deletar',
          role: 'destructive',
          handler: () => {
            this.showConfirmation('Deseja realmente apagar este projeto?', () => {
              
              this.projectCtrl.remove(this.project)
              .then(() => {
              }).catch(() => {
              });  
            });                     
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    }).present();
  }

  showConfirmation(message: string, yesAction) {
    let prompt = this.alertCtrl.create({
      title: 'Confirmação',
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
          }
        },
        {
          text: 'Sim',
          handler: data => {
            yesAction();
          }
        }
      ]
    });
    prompt.present();
  }

}
