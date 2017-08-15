# 陪我后台管理系统

## Getting Started

### Prerequisites
+ unix-like OS
+ python-dev  


### Install
+ Get repo.  
```git clone git@dev.fabibao.com:PeiwoServices/peiwo-admin.git peiwo-admin```
+ Install requirements.  
 ```cd peiwo-admin && pip install -r requirements.txt```

## Running the tests
+ Test version  
```
cd src &&  python manage.py test --settings=peiwoadmin.settings.base 
```

## Make it run  
+ Dev version  
```
cd src && python manage.py runserver --settings=peiwoadmin.settings.default 
```
+ Test version
```
cd src && python manage.py runserver --settings=peiwoadmin.settings.product_test 
```
+ Staging version
```
cd src && python manage.py runserver --settings=peiwoadmin.settings.product_test 
```
+ Live version
```
cd src && python manage.py runserver --settings=peiwoadmin.settings.product 
```

## Deployment
+ gunicorn + nginx
```

```