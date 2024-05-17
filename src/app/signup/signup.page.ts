import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {
  singUpForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthenticationService,
    private router: Router,
    private alertCtrl: AlertController,
    private ngFireAuth: Auth // Importar el servicio de autenticación de AngularFire
  ) {}

  ngOnInit() {
    this.singUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^.{6,20}$/)]],
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2500,
      position: 'middle',
    });

    await toast.present();
  }

  resetForm() {
    this.singUpForm.reset();
  }

  async singUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    if (this.singUpForm?.valid) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          this.ngFireAuth,
          this.singUpForm.value.email,
          this.singUpForm.value.password
        );

        loading.dismiss();

        this.resetForm();
        this.presentAlert('Éxito', '¡Cuenta creada exitosamente!');
        this.router.navigate(['/home']);
      } catch (error) {
        let errorMessage = 'Hubo un problema al crear la cuenta';
        if (error.code === 'auth/invalid-email') {
          errorMessage = 'El correo electrónico proporcionado no es válido';
        } else if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Su correo electrónico ya está registrado, inicie sesión';
        }
        this.presentAlert('Error', errorMessage);
        console.error(error);
        loading.dismiss();
      }
    } else {
      loading.dismiss();
      this.presentToast('Algo ha sucedido en el servidor');
    }
  }

  async presentAlert(title: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
