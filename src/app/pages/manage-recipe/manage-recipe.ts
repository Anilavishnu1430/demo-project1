import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-manage-recipe',
  imports: [Header,Footer ReactiveFormsModule],
  templateUrl: './manage-recipe.html',
  styleUrl: './manage-recipe.css',
})
export class ManageRecipe {

  recipeId: any;
  recipeForm!: FormGroup;

  route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private apiService = inject(Api)

  ngOnInit() {

    this.recipeId = this.route.snapshot.params['id'];

    this.recipeForm = this.fb.group({
      
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      cuisine: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      prepTimeMinutes: ['', [Validators.required]],
      cookTimeMinutes: ['', [Validators.required]],
      image: [''],
      ingredients: ['', [Validators.required]],
      instructions: ['', [Validators.required]],
      servings: ['', [Validators.required]],
      difficulty: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      caloriesPerServing: ['', [Validators.required]],
      mealType: ['']
    });

    if (this.recipeId) {
      this.loadRecipe();
    }
  }

  loadRecipe() {
    this.recipeService.getRecipeById(this.recipeId).subscribe({
      next: (res: any) => {
        this.recipeForm.patchValue(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  submit() {
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      return;
    }

    if (this.recipeId) {
      this.recipeService.updateRecipeAPI(this.recipeId, this.recipeForm.value)
        .subscribe(res => {
          console.log("Updated", res);
        });
    } else {
      this.recipeService.addRecipeAPI(this.recipeForm.value)
        .subscribe(res => {
          console.log("Added", res);
        });
    }
  }
}
