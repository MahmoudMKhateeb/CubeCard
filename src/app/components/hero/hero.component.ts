import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  template: `
    <section class="bg-blue-600 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Our Modern Platform
          </h1>
          <p class="text-xl mb-8">
            Discover amazing products and stay up to date with our latest blog posts
          </p>
          <div class="space-x-4">
            <button class="btn-primary bg-white text-blue-600 hover:bg-gray-100">
              Get Started
            </button>
            <button class="btn-primary border-2 border-white bg-transparent hover:bg-white hover:text-blue-600">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent {}