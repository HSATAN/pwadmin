# 陪我后台管理系统

## Getting Started

### Prerequisites
+ unix-like OS
+ python-dev  


### Install
+ Get repo.  
```git clone git@dev.fabibao.com:PeiwoServices/peiwo-admin.git peiwo-admin```
+ Install requirements.  
 ```cd peiwo-admin && pip install -r requirements/base```

## Running the tests
+ Test version
```peiwo-admin
cd src &&  python manage.py test --settings=peiwoadmin.settings.dev 

```

## Make it run
+ Dev version  
```peiwo-admin
cd src && python manage.py runserver --settings=peiwoadmin.settings.dev 
```
+ Test version
+ Staging version
+ Live version


## Deployment