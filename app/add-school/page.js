'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { ArrowLeft, Upload, School, Mail, Phone, MapPin, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const schoolSchema = z.object({
  name: z.string().min(2, 'School name must be at least 2 characters').max(100, 'School name is too long'),
  address: z.string().min(10, 'Address must be at least 10 characters').max(200, 'Address is too long'),
  city: z.string().min(2, 'City name must be at least 2 characters').max(50, 'City name is too long'),
  state: z.string().min(2, 'State name must be at least 2 characters').max(50, 'State name is too long'),
  contact: z.string().regex(/^[0-9]{10}$/, 'Contact must be a 10-digit number'),
  email_id: z.string().email('Please enter a valid email address'),
  image: z.any().optional()
});

export default function AddSchool() {
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: zodResolver(schoolSchema)
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call - in real implementation, this would be a Supabase call
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      // Simulate saving to database
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save to localStorage for demonstration
      const schools = JSON.parse(localStorage.getItem('schools') || '[]');
      const newSchool = {
        id: Date.now(),
        ...data,
        image: imagePreview || `https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg?auto=compress&cs=tinysrgb&w=500`
      };
      schools.push(newSchool);
      localStorage.setItem('schools', JSON.stringify(schools));

      toast({
        title: "Success!",
        description: "School has been added successfully.",
      });

      // Reset form
      reset();
      setImagePreview('');
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add school. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-2">
              <School className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Add New School</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">School Registration</CardTitle>
              <CardDescription>
                Please fill out all the required information to register a new school
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* School Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center space-x-2">
                    <School className="h-4 w-4" />
                    <span>School Name *</span>
                  </Label>
                  <Input
                    id="name"
                    {...register('name')}
                    placeholder="Enter school name"
                    className="w-full"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Address *</span>
                  </Label>
                  <Textarea
                    id="address"
                    {...register('address')}
                    placeholder="Enter complete address"
                    className="w-full min-h-[80px]"
                  />
                  {errors.address && (
                    <p className="text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>

                {/* City and State */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      {...register('city')}
                      placeholder="Enter city"
                      className="w-full"
                    />
                    {errors.city && (
                      <p className="text-sm text-red-600">{errors.city.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      {...register('state')}
                      placeholder="Enter state"
                      className="w-full"
                    />
                    {errors.state && (
                      <p className="text-sm text-red-600">{errors.state.message}</p>
                    )}
                  </div>
                </div>

                {/* Contact and Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact" className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>Contact Number *</span>
                    </Label>
                    <Input
                      id="contact"
                      {...register('contact')}
                      placeholder="10-digit phone number"
                      className="w-full"
                      maxLength={10}
                    />
                    {errors.contact && (
                      <p className="text-sm text-red-600">{errors.contact.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email_id" className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Email Address *</span>
                    </Label>
                    <Input
                      id="email_id"
                      type="email"
                      {...register('email_id')}
                      placeholder="school@example.com"
                      className="w-full"
                    />
                    {errors.email_id && (
                      <p className="text-sm text-red-600">{errors.email_id.message}</p>
                    )}
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <ImageIcon className="h-4 w-4" />
                    <span>School Image</span>
                  </Label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="School preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-4 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> school image
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                        </div>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full h-12"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Adding School...</span>
                      </div>
                    ) : (
                      'Add School'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}