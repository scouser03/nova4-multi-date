# A MultiDate field for Laravel Nova

## Installation

First you must install this package in to a Laravel app that uses [Nova](https://nova.laravel.com) via composer:

```bash
composer require scouser03/nova4-multi-date
```

## Usage

```php
namespace App\Nova;

use Scouser03\Nova4MultiDate\Nova4MultiDate;


class BlogPost extends Resource
{
    // ...

    public function fields(Request $request)
    {
        return [
            // ...

            Nova4MultiDate::make('multi dates', 'multi_dates'),

            // ...
        ];
    }
}

```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
