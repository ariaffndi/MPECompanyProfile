<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewOrderAdmin extends Notification implements ShouldQueue
{
    use Queueable;
    public $inquiry;

    /**
     * Create a new notification instance.
     */
    public function __construct($inquiry)
    {
        $this->inquiry = $inquiry;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
        ->greeting('Halo!')
        ->line('Pesanan IPAL baru telah diterima.')
        ->line('Nama: ' . $this->inquiry->name)
        ->line('Email: ' . $this->inquiry->email)
        ->line('Telepon: ' . $this->inquiry->phone)
        ->line('Detail: ' . $this->inquiry->detail)
        ->line('Silakan cek pada website Mitra Prima Enviro untuk melihat detailnya.')
        ->line('Terimakasih.')
        ->line('-----------------------------')
        ->line('Hello!')
        ->line('A new order has been received.')
        ->line('Name: ' . $this->inquiry->name)
        ->line('Email: ' . $this->inquiry->email)
        ->line('Phone: ' . $this->inquiry->phone)
        ->line('Details: ' . $this->inquiry->detail)
        ->line('Please check the Mitra Prima Enviro website for more details.')
        ->line('Thank you.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}