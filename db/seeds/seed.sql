INSERT INTO contacts (name,email,owed,service,date_of_service,contractor) VALUES('Buzz Lightyear','datetimetest001@yahoo.com',1000,'website construction','7/29/2017',1),
  ('Woody','youareatoy@howdy.com',200,'app maintainance','7/01/2017',1),
  ('Bo Peep','countingsheep@yahoo.com',500,'app maintainance','1/04/2017',1),
  ('Rex','madebymattelbutnotreally@gmail.com',1000,'website maintainance','11/08/2017',2),
  ('Slinky','wheresmyotherhalf@gmail.com',1000,'website construction','8/16/2017',2);

INSERT INTO templates (name,template) VALUES
('first request','Hello <%= selected.name %>,
 I hope this email finds you well. This is a first requisition for payment on the <%= selected.service %> performed on <%= selected.date_of_service %>. The current balance owed is <%= selected.owed %>. Please reach out to me if you need me to resend my paypal link or if you have any questions. ');
