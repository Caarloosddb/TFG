import { Component, OnInit } from '@angular/core';
import { CommonModule }            from '@angular/common';
import { ReactiveFormsModule }     from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router }                  from '@angular/router';
import { FirestoreService }        from '../../services/firestore.service';
import { Auth }                    from '@angular/fire/auth';

@Component({
  selector: 'app-profile-setup',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss']
})
export class ProfileSetupComponent implements OnInit {
  profileForm: FormGroup;
  uid!: string;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private firestoreService: FirestoreService,
    private auth: Auth,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      nationality:     ['', Validators.required],
      favoriteTeam:    ['', Validators.required],
      favoritePlayer:  ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const user = this.auth.currentUser;
    if (user) {
      this.uid = user.uid;
    } else {
      this.router.navigate(['/register']);
    }
  }

  onCompleteProfile(): void {
    if (this.profileForm.invalid) return;
    this.firestoreService.createUserProfile(this.uid, this.profileForm.value)
      .then(() => this.router.navigate(['/home']))
      .catch(() => this.error = 'Error al guardar perfil');
  }
}
