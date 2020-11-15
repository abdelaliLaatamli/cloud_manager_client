SELECT eee.name , ifnull (
  ( SELECT aaaaa.sum_pro from
    ( select e.entity_id , SUM( e.prov_sum ) as sum_pro from
      ( SELECT ep.entity_id ,
        ifnull ((


          select count(i.id) as proriver_count from instances as i , accounts as a , providers as p WHERE i.account_id = a.id and
        a.provider_id=p.id and p.id=ep.provider_id GROUP by i.account_id



        ) , 0 ) as prov_sum from entities_providers as ep ) as e GROUP by e.entity_id ) as aaaaa
      WHERE aaaaa.entity_id=eee.id ) , 0 ) as dd
    from entities as eee



-- select count(i.id) as proriver_count from instances as i , accounts as a , providers as p WHERE i.account_id = a.id and a.provider_id=p.id and month(i.created_at)=11 GROUP by i.account_id



SELECT eee.name , ifnull (( SELECT aaaaa.sum_pro from ( select e.entity_id , SUM( e.prov_sum ) as sum_pro from ( SELECT ep.entity_id , ifnull ((select count(i.id) as proriver_count from instances as i , accounts as a , providers as p WHERE i.account_id = a.id and a.provider_id=p.id and p.id=ep.provider_id GROUP by i.account_id) , 0 ) as prov_sum from entities_providers as ep ) as e GROUP by e.entity_id ) as aaaaa WHERE aaaaa.entity_id=eee.id ) , 0 ) as dd from entities as eee
